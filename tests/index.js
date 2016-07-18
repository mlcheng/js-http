/***********************************************

  "index.js"

  Created by Michael Cheng on 07/18/2016 12:20
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

/* globals require, __dirname, iqwerty */
const { Test, inject } = require('../../test/test.js');
inject(__dirname, '../http.js');


Test('Cache can store data and persist across calls')
	.do(() => {
		iqwerty.http.Cache().setCache('key', 'value');
	})
	.expect(iqwerty.http.Cache().getCache('key'))
	.toBe('value');

Test('Getting nonexistent data from cache returns undefined')
	.expect(iqwerty.http.Cache().getCache('dummy'))
	.toBe(undefined);