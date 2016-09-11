/***********************************************

  "index.js"

  Created by Michael Cheng on 07/18/2016 12:20
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

/* globals require, __dirname */
const { Test } = require('../../test/test.js');
const Http = require(`${__dirname}/../http.js`);


Test('Cache can store data and persist across calls')
	.do(() => {
		Http.Cache().setCache('key', 'value');
	})
	.expect(Http.Cache().getCache('key'))
	.toBe('value');

Test('Getting nonexistent data from cache returns undefined')
	.expect(Http.Cache().getCache('dummy'))
	.toBe(undefined);