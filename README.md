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
