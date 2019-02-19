# Ionic Modal Transition: 

This extends Ionic's custom modal transitions, with our custom transition pack.

You must include the following in your `app.component.ts`:

    constructor(public  config: Config) {
    
    this.setCustomTransitions(); // Set the custom modal transitions.
    } 

    private setCustomTransitions() {
        this.config.setTransition('ModalEnterDirect', ModalEnterDirect);
        this.config.setTransition('ModalLeaveDirect', ModalLeaveDirect);
    
        this.config.setTransition('ModalEnterFadeIn', ModalEnterFadeIn);
        this.config.setTransition('ModalLeaveFadeOut', ModalLeaveFadeOut);
    
        this.config.setTransition('ModalEnterZoomIn', ModalEnterZoomIn);
        this.config.setTransition('ModalLeaveZoomIn', ModalLeaveZoomIn);
    
        this.config.setTransition('ModalEnterZoomOut', ModalEnterZoomOut);
        this.config.setTransition('ModalLeaveZoomOut', ModalLeaveZoomOut);
    }

Then you use it via: 

    let modal = this.modalCtrl.create('LoadingPage', '', {
      enterAnimation: 'ModalEnterFadeIn',
      leaveAnimation: 'ModalLeaveZoomOut'
    });
