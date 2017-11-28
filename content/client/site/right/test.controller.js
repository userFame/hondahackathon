(function () {
    "use strict";

    angular.module('client.site')
        .controller('sideNavController', SideNavControllerFunction)

    SideNavControllerFunction.$inject = ['$log']

    function SideNavControllerFunction($log) {
        var vm = this;
        vm.emergencyMsg = _emergencyMsg;
        vm.fuelMsg = _fuelMsg;
        vm.lostMsg = _lostMsg;
        //vm.emergency = _emergency;
        //vm.callFriend = _callFriend;
        vm.toggle = _toggle;
        vm.toggletwo = _toggletwo;
        vm.emergencyActive = false;
        vm.frenCallActive = false;

        vm.airbags = {
            isActive: true,
            isDeployed: false,
            location: "FRONT_LEFT",
            type: "FRONTAL"
        };

        vm.fuel = {
            amountRemaining: 53.2,
            percentRemaining: 0.3,
            range: 40.5
          }

        function _emergencyMsg() {
            vm.airbags.isDeployed = true;
            console.log("airbags");
            var message = "Emergency message is sending to your close friends";
            if (vm.airbags.isDeployed == true) {
                alert(message);
                _fuelMsg();
            }
        }

        function _fuelMsg(){
            vm.isActive = true;
        }

        function _lostMsg(){
            vm.isLost = true;
        }
        // function _emergency(){
        //     vm.emergencyActive = true;
        // }
        // function _callFriend(){
        //     vm.frenCallActive = true;
        // }

        function _toggle() {
            vm.isOpen = !vm.isOpen
            if (!vm.isOpen) {
                vm.isActive = false;
                vm.isLost = false;
            }
        }

        function _toggletwo() {
            vm.hide = !vm.hide
           if (!vm.isOpen){
                vm.emergencyActive = false;
                vm.frenCallActive = false;
            }
        }
    }
})()