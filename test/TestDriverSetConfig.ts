import {inject} from '@angular/core/testing'

import {DRIVERS} from '../src/DriverTypes'
import {Locker} from '../src/Locker'

import {initTestBed} from './testHelpers'

export const TestDriverSetConfig = function(driverName, driver: DRIVERS) {
  describe(driverName, function() {
    const createDummy = (expires) => ({
      key: 'hi',
      data: 'bill',
      config: {expires}
    })

    var locker: Locker

    beforeEach(() => initTestBed())
    beforeEach(inject([Locker], (lockerService: Locker) => locker = lockerService))

    it('can set expiry and have it expire at date', function() {
      const EXPIRY = new Date()

      const DUMMY = createDummy(EXPIRY)

      locker.set(driver, DUMMY.key, DUMMY.data, DUMMY.config)

      assert(!locker.get(driver, DUMMY.key))
    })

    it('can set expiry and before date will still fetch data', function() {
      const EXPIRY = new Date()

      EXPIRY.setMinutes(EXPIRY.getMinutes() + 10)

      const DUMMY = createDummy(EXPIRY)

      locker.set(driver, DUMMY.key, DUMMY.data, DUMMY.config)
      assert.deepEqual(locker.get(driver, DUMMY.key), DUMMY.data)
    })
  })
}
