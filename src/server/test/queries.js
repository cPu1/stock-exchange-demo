import deferredDb from '../service/db.js'
import {makeFeedsQuery} from '../service/queries.js'
import {equal} from 'assert'

describe('Metrics query', () => {

  let collection

  before(done => deferredDb.then(db => {
    collection = db.collection('cdr')
    done()
  }))

  it('should return counts in order', done => {
    collection.aggregateAsync(makeFeedsQuery(1, 1000)).then(d => {
      d.forEach(d => {
        const counts = d.timeCounts
        const sortedCounts = [...counts].sort((x, y) => x.time - y.time)
        console.log('tt', sortedCounts, d.timeCounts, sortedCounts === d.timeCounts)

        let totalCount = 0
        counts.forEach((tc, i) => {
          equal(tc.time, sortedCounts[i].time)
          totalCount += tc.count
          console.log('t', tc.time - 24300000)
        })

        equal(totalCount, d.totalCalls)
      })
      done()
    }).catch(done)
  })
})