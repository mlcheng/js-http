<?php
/***********************************************

  "data.php"

  Created by Michael Cheng on 06/04/2015 10:19
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/
sleep(1);
if(isset($_GET['min'])) {
	echo "The random number is " . mt_rand($_GET['min'], $_GET['max']);
}
?>