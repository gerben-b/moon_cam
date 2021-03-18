# moon_cam
Moon_cam is designed to take pictures from the moon and planets. Moon_cam has a video mode that gives visual feedback while aiming the telescope on the desired target and while focussing.
When done, take either single pictures or bursts.
Moon_cam uses a number of libraries:
- https://github.com/mourner/suncalc
- https://github.com/cosinekitty/astronomy
- https://github.com/jacksonliam/mjpg-streamer

Without their excellent work, I would not have been able to create moon_cam.

Suncalc and astronomy are used to calculate the location of the moon and planets and mjpg-streamer is used for the visual feedback.

Some notes on installation of this software:
- Moon_calc uses the apache webserver in the Raspberry pi 4 which runs as user pi;
- Mjpg-streamer must be built from source on the Raspberry pi;
- The camera is a Raspberry HQ camera, but other camera's should work to with some tweaking of the scripts.

In the near future, moon_cam will also be able to control a telescope using the indi library. This is currently under test.

Issues
- I am not sure that all angles are correct. The calculations in astronomy match those in kstars but the suncalc calculations seem slightly of;
- mjpg-streamer hangs after a while when more video data is produced than can be tranferred. I does not drop frames in those conditions;
- moon_cam was desinged to work on a Raspberry pi, for other hardware the shell scripts in the streamer folder may need adjusting.

For those who like to learn coding: I am not a programmer, for me it is just fun, so don't expect to find good coding practice in this repository.
