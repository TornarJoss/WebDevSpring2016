/**
 * Created by NishantRatnakar on 2/28/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, $rootScope, UserService){

        var vm = this;
        vm.register = register;

        function init()
        {
            console.log("In register controller");
        }

        init();

        $scope.rmessage = null;


        function register(user)
        {

            //if (user.username == null || user.password == null || user.passwordverify == null || user.email == null) // null as object is still not created in register.
            //{
            //    console.log(user.username);
            //    $scope.rmessage = "Please enter all the details";
            //    return;
            //}

            if(!user.username)
            {
                $scope.rmessage = "Please provide a username";
                return;
            }

            if (!user.password || !user.passwordverify)
            {
                $scope.rmessage = "Please provide a password";
                return;
            }

            if(!user.email)
            {
                $scope.rmessage = "Please provide an email";
                return;
            }

            if (user.password != user.passwordverify)
            {
                $scope.rmessage = "Password provided does not match. Please re-enter details.";
                return;
            }


                var userObj = {"username": user.username, "password": user.password, "emails": user.email, "roles":"[student]", "firstName": "", "lastName": ""};

                UserService.createUser(userObj)
                    .then(function(response)
                    {
                       var newUser = response.data;

                        if(newUser)
                        {
                            UserService.setCurrentUser(newUser);
                            $location.url("/profile");
                            //$location.url("/profile/"+ newUser._id);
                        }
                        else
                        {
                            $scope.rmessage = "Please try again"
                        }
                    },function (error)
                    {
                        console.log(error);
                    });

        }
    }

})();