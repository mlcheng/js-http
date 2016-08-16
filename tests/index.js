/***********************************************

  "index.js"

  Created by Michael Cheng on 07/18/2016 12:20
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

/* globals require, __dirname */
const { Test, namespace } = require('../../test/test.js');
const iqwerty = namespace(`${__dirname}/../`, 'http');


Test('Cache can store data and persist across calls')
	.do(() => {
		iqwerty.http.Cache().setCache('key', 'value');
	})
	.expect(iqwerty.http.Cache().getCache('key'))
	.toBe('value');

Test('Getting nonexistent data from cache returns undefined')
	.expect(iqwerty.http.Cache().getCache('dummy'))
	.toBe(undefined);