const db = require('../models')

const { Prize } = db

const lottery = {
  drawLottery: (prize, minUnit) => { // data, 0.01(unit:%)
    const prizeWeight = [0]
    const unit = 1 // =% = percent
    const totalSamples = 1 / unit / minUnit * 100 // (機率 1) * (100%/1) = 100%
    const unitSamples = 1 / minUnit
    let sumSamples = 0
    const arrSamples = []
    // 有中獎的 prize[i] i 為資料庫內的 rows 順序
    for (let i = 1; i < prize.length; i++) { // 機率：[1,3,5,15] 單位：％
      const samples = parseInt(prize[i].prizeProbability) * unitSamples
      prizeWeight[i] = samples
      sumSamples += samples

      for (let j = 0; j < samples; j++) {
        arrSamples.push(i)
      }
    }
    // 剩下沒有中獎
    for (let i = 0; i < totalSamples - sumSamples; i++) {
      arrSamples.push(0)
    }
    const randNum = Math.ceil(Math.random() * totalSamples)
    return prize[arrSamples[randNum]] // 回傳 prize[i] 的 i 位置
  },
  getProbabilityOfNoPrize: async() => {
    let sum = 0
    const data = await Prize.findAll({
      order: [['prizeOrder', 'ASC']]
    })
    for (let i = 1; i < data.length; i++) {
      sum += data[i].prizeProbability
    }
    const result = 100 - sum
    return result
  },
  updateNoPrizeIntoDB: async(probabilityOfNoPrize) => {
    const noPrize = await Prize.findOne({
      where: {
        prizeOrder: 0
      }
    })
    noPrize.update({
      prizeProbability: parseInt(probabilityOfNoPrize)
    })
  }
}

module.exports = lottery
