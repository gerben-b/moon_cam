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

    get_profile_state(key) {
        return this.state.profile[key];
    }
}
