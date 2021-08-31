const db = require('../models')
const lottery = require('../scripts/lottery_new')

const { Prize } = db

const prizeController = {
  backStagePage: async(req, res) => {
    try {
      const prize = await Prize.findAll({
        order: [['prizeOrder', 'ASC']]
      })
      // 當編輯或新增獎項時，因為會 redirect 回到此頁面，所以一樣要更新：未中獎機率
      const probabilityOfNoPrize = await lottery.getProbabilityOfNoPrize()
      // 將更新後，把新算出的未中獎機率放進資料庫
      lottery.updateNoPrizeIntoDB(probabilityOfNoPrize)
      // render page
      res.render('backStage', {
        prize,
        probabilityOfNoPrize
      })
    } catch (err) {
      req.flash('errorMessage', err.toString())
    }
  },
  add: async(req, res) => {
    const { prizeOrder, prizeName, prizeItem, prizeDesc, imageURL, prizeAmount, prizeProbability } = req.body

    if (!prizeOrder || !prizeName || !prizeItem || !prizeDesc || !imageURL || !prizeAmount || !prizeProbability) {
      req.flash('errorMessage', 'Incomplete input fields')
      return res.redirect('back')
    }

    try {
      // 在新增獎項前，針對 req.body.新機率做計算，避免新增獎項後，機率 > 100 %。
      const noPrizeOld = await Prize.findOne({
        where: {
          prizeOrder: 0
        }
      })
      if (noPrizeOld.prizeProbability - prizeProbability < 0) { // 如果：更新後未中獎的機率為負： sum > 100
        req.flash('errorMessage', 'The sum of probability of all events is invalid (largern than 100%)')
        res.redirect('back')
        return
      }
      await Prize.create({
        prizeOrder,
        prizeName,
        prizeItem,
        prizeDesc,
        imageURL,
        prizeAmount,
        prizeProbability: parseInt(prizeProbability)
      })
      // 算更新後，沒有中獎的機率
      const probabilityOfNoPrize = await lottery.getProbabilityOfNoPrize()
      // 將更新後，沒有中獎的機率放進資料庫
      lottery.updateNoPrizeIntoDB(probabilityOfNoPrize)
      // redirect
      await res.redirect('/back-stage')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      res.redirect('back')
    }
  },
  lotteryPage: async(req, res) => {
    const prize = await Prize.findAll({
      order: [['prizeOrder', 'ASC']]
    })
    res.render('lottery', {
      prize
    })
  },
  drawLottery: async(req, res) => {
    const prize = await Prize.findAll({
      order: [['prizeOrder', 'ASC']]
    })
    try {
      const result = await lottery.drawLottery(prize, 1)
      res.render('lotteryResult', {
        result
      })
    } catch (err) {
      alert('系統不穩定，請再試一次', err.toString())
    }
  },
  updatePage: async(req, res, next) => {
    const prize = await Prize.findAll({
      order: [['prizeOrder', 'ASC']]
    })
    const probabilityOfNoPrize = await lottery.getProbabilityOfNoPrize()

    res.render('updateLottery', {
      prize,
      probabilityOfNoPrize
    })
  },
  update: async(req, res) => {
    const { prizeOrder, prizeName, prizeItem, prizeDesc, imageURL, prizeAmount, prizeProbability } = req.body
    if (!prizeOrder || !prizeName || !prizeItem || !prizeDesc || !imageURL || !prizeAmount || !prizeProbability) {
      req.flash('errorMessage', 'Incomplete input fields')
      return res.redirect('back')
    }
    try {
      const noPrizeOld = await Prize.findOne({
        where: {
          prizeOrder: 0
        }
      })
      // 找到想要更新的那筆資料
      const prize = await Prize.findOne({
        where: {
          id: req.params.id
        }
      })
      // 如果 更新後未中獎的機率為負：
      if (noPrizeOld.prizeProbability - prizeProbability + prize.prizeProbability < 0) {
        req.flash('errorMessage', 'The sum of probability of all events is invalid (largern than 100%)')
        res.redirect('back')
        console.log('>100')
        return
      } else {
        console.log('<100')
      }
      // 如果更新後的未中獎機率為正，則可以輸入資料庫，成功
      await prize.update({
        prizeOrder,
        prizeName,
        prizeItem,
        prizeDesc,
        imageURL,
        prizeAmount: parseInt(prizeAmount),
        prizeProbability: parseInt(prizeProbability)
      })
      // 算更新後，沒有中獎的機率
      const probabilityOfNoPrize = await lottery.getProbabilityOfNoPrize()
      // 將更新後，沒有中獎的機率放進資料庫
      lottery.updateNoPrizeIntoDB(probabilityOfNoPrize)
      // redirect
      return res.redirect('/back-stage')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      return res.redirect('back')
    }
  },
  delete: async(req, res) => {
    try {
      await Prize.destroy({
        where: {
          id: req.params.id
        }
      })
      await res.redirect('/back-stage')
    } catch (err) {
      req.flash('errorMessage', err.toString())
      res.redirect('back')
    }
  }
}

module.exports = prizeController
