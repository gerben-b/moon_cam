<?php
  $output=null;
  $retval=null;
  exec("/home/pi/cam/streamer/scope_track_sidereal.sh", $output, $retval);
  echo $retval;
 ?>
