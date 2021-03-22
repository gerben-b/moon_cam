class Observatory {

    constructor() {
    }

    state = {
        profile: {}
    }

    set_profile(profile) {
        this.state.profile = profile;
     }

    set_profile_state(key, value) {
        if (this.state.profile[key] != value) {
            this.state.profile[key] = value;
        }
    }

    slew_enabled = false;

    get_profile_state(key) {
        return this.state.profile[key];
    }

    enable_slew() {
        observatory.slew_enabled = true;
        document.getElementById("west_button").style.backgroundColor = "#4444AA";
        document.getElementById("east_button").style.backgroundColor = "#4444AA";
        document.getElementById("north_button").style.backgroundColor = "#4444AA";
        document.getElementById("south_button").style.backgroundColor = "#4444AA";
    }

    disable_slew() {
        observatory.slew_enabled = false;
        document.getElementById("west_button").style.backgroundColor = "#333333";
        document.getElementById("east_button").style.backgroundColor = "#333333";
        document.getElementById("north_button").style.backgroundColor = "#333333";
        document.getElementById("south_button").style.backgroundColor = "#333333";
    }

    scope_off() {
        document.getElementById("off_button").style.backgroundColor = "#333333";
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("off_button").style.backgroundColor = "#4444AA";
                observatory.disable_slew();
            }
        }
        xmlhttp.open("GET", "scope_off.php", true);
        xmlhttp.send();
    }

    track_moon() {
        document.getElementById("moon_button").style.backgroundColor = "#333333";
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.responseText == "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("moon_button").style.backgroundColor = "#4444AA";
                observatory.enable_slew();
            }
            if (xmlhttp.responseText != "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("moon_button").style.backgroundColor = "#4444AA";
                observatory.disable_slew();
            }
        }
        xmlhttp.open("GET", "track_moon.php", true);
        xmlhttp.send();
    }

    track_planet() {
        document.getElementById("planet_button").style.backgroundColor = "#333333";
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.responseText == "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("planet_button").style.backgroundColor = "#4444AA";
                observatory.enable_slew();
            }
            if (xmlhttp.responseText != "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("planet_button").style.backgroundColor = "#4444AA";
                observatory.disable_slew();
            }
        }
        xmlhttp.open("GET", "track_planet.php", true);
        xmlhttp.send();
    }

    slew_west() {
        if (observatory.slew_enabled == false) {return;}
        document.getElementById("west_button").style.backgroundColor = "#333333";
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.responseText == "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("west_button").style.backgroundColor = "#4444AA";
            }
        }
        xmlhttp.open("GET", "slew_west.php", true);
        xmlhttp.send();
    }

    slew_east() {
        if (observatory.slew_enabled == false) {return;}
        document.getElementById("east_button").style.backgroundColor = "#222222";
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.responseText == "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("east_button").style.backgroundColor = "#4444AA";
            }
        }
        xmlhttp.open("GET", "slew_east.php", true);
        xmlhttp.send();
    }

    slew_north() {
        if (observatory.slew_enabled == false) {return;}
        document.getElementById("north_button").style.backgroundColor = "#333333";
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.responseText == "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("north_button").style.backgroundColor = "#4444AA";
            }
        }
        xmlhttp.open("GET", "slew_north.php", true);
        xmlhttp.send();
    }

    slew_south() {
        if (observatory.slew_enabled == false) {return;}
        document.getElementById("south_button").style.backgroundColor = "#222222";
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.responseText == "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("south_button").style.backgroundColor = "#4444AA";
            }
        }
        xmlhttp.open("GET", "slew_south.php", true);
        xmlhttp.send();
    }
}
