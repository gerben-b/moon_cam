<?php
  $output=null;
  $retval=null;
  exec("/home/pi/cam/streamer/scope_slew_south.sh", $output, $retval);
  echo $retval;
 ?>
