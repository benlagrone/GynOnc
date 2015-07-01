'use strict';

/* Controllers */
//var MDAndersonMobile = angular.module('MDAndersonMobile');
angular.module('MDAndersonMobile.controllers', ['ui.bootstrap', 'geolocation', 'ui.utils', 'duScroll'])

    .controller('referralThankYou', function ($scope, $document, $location, $anchorScroll) {
        function toTheTop() {
            $document.scrollTo(0, 0)
        }

        toTheTop();
    })
    .controller('timeOut', function ($scope, $timeout, $location, $anchorScroll, $document) {
        //$location.hash('head');
        //$anchorScroll();
        function toTheTop() {
            $document.scrollTo(0, 0)
        }

        toTheTop();
        $scope.hideSideMenu = true;
        function forceLogout() {
            $timeout(function () {
                console.log("timeout!");
                //window.location = "/";
            }, 5000);
        }

        //forceLogout();
    })
    .controller('errorHandler', function ($scope, formErrorMessageService, $document) {
        $scope.message = 'Unknown Error'
        if (formErrorMessageService.getStoredMessage())
            var storedMessage = formErrorMessageService.getStoredMessage();
        $scope.message = storedMessage.errorMessage;
        function toTheTop() {
            $document.scrollTo(0, 0)
        }

        toTheTop();
    })
    .controller('DatepickerDemoCtrl', ['$scope', function ($scope) {

        //Close the info again
        $scope.now = new Date();
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.showWeeks = true;
        $scope.toggleWeeks = function () {
            $scope.showWeeks = !$scope.showWeeks;
        };

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function () {
            $scope.minDate = ( $scope.minDate ) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 0
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        $scope.format = $scope.formats[0];
    }])
    .controller('rapidReferralForm', function ($scope, formAPIService, checkUser, geolocation, $timeout, formErrorMessageService) {

        $scope.locationRowClass;
        $scope.hideBanner = true;
        //get the location coordinates of the user
        geolocation.getLocation().then(function (data) {
            $scope.initGPS = "Select a Location";
            $scope.coords = {lat: data.coords.latitude, long: data.coords.longitude};
        });


        //call the service to check for mobile user agent
        $scope.mobile = checkUser.isMobile();
        $scope.formData = {};
        $scope.initGPS = "Searching for MD Anderson...";
        $scope.initPhysician = "Select a Physician";
        $scope.initDiagnosis = "Select a Diagnosis";
        $scope.locationPredicate;
        $scope.physicianPredicate;
        $scope.physicianGroupMatch = 'location';
        $scope.physicianFilter;
        $scope.disablePhysicianOption = "true";
        $scope.topAlert;
        $scope.showProviderSelect = false;
        $scope.phoneFormats = "";
        $scope.openSelect = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        };

        //assigns objects to be watched and do something on change
        $scope.$watchCollection('[coords,formData.Location,formData.Physician,formData.PhoneNumber]', function (newValue, oldValue) {

                // Ignore initial setup.
                if (newValue === oldValue) {
                    console.log("coords changed");
                    return;
                }


                //the location changed
                if (newValue[1]) {

                }
                //the doctor changed
                if (newValue[2] != oldValue[2]) {
                    console.log("doctor changed");

                    if ($scope.formData.Location) {
                        if (!locationInArray(newValue[2].locationsList, $scope.formData.Location.clinicName)) {
                            console.log("no match");
                            $scope.locationRowClass = "ai-change-alert physician";
                            $scope.topAlert = "I found that physician's location";
                            $timeout(function () {
                                $scope.locationRowClass = null;
                            }, 3000)
                        }
                    }
                    return;
                }

                if (newValue[3]) {
                    if (newValue[3] != oldValue[3]) {
                        if (newValue[3].length == 10) {
                            $scope.phoneFormats = '(999) 999-9999';
                        } else if (newValue[3].length != 10) {
                            $scope.phoneFormats = '';
                        }
                        return;
                    }
                }
                //the geo-coords changed
                if (newValue[0]) {
                    if (newValue[1])
                        return;
                    //here you want to get the closest location
                    var closest = findNearestMDAnderson(newValue[0]);
                    $scope.hideBanner = false;
                    $scope.formData.Location = $scope.locationList[closest];
                    $scope.locationRowClass = "ai-change-alert geo";
                    $scope.topAlert = "I found your nearest location";
                    $timeout(function () {
                        $scope.locationRowClass = null;
                        $scope.topAlert = "";
                        $scope.hideBanner = true;
                    }, 3000)
                }
            }
        );

        $scope.phoneKey = function ($event) {
            if ($scope.formData.PhoneNumber) {
                if ($scope.formData.PhoneNumber.length == 10) {
                    $scope.phoneFormats = '';
                }
            }
        };

        function locationInArray(locationArray, location) {
            for (var z = 0; z < locationArray.length; z++) {
                if (location === locationArray[z])
                    return true
            }
            return false
        }

        $scope.checkValid = function () {
            var errorTempList = [];
            if ($scope.rapidReferralForm.$error.required) {
                for (var r = 0; r < $scope.rapidReferralForm.$error.required.length; r++) {
                    var theError = {}
                    theError.type = "required";
                    theError.name = $scope.rapidReferralForm.$error.required[r].$name;
                    errorTempList.push(theError)
                }
            }
            if ($scope.rapidReferralForm.$error.date) {
                for (var d = 0; d < $scope.rapidReferralForm.$error.date.length; d++) {
                    var theError = {}
                    theError.type = "date"
                    theError.name = $scope.rapidReferralForm.$error.date[d].$name
                    errorTempList.push(theError)
                }
            }
            if (errorTempList.length > 0) {
                $scope.errorList = errorTempList;
                $timeout(function () {
                    $scope.errorList = ""
                }, 3000)
            } else {
                var data = $scope.formData;
                formAPIService.newRapidReferralFormPOST(data).success(function (status, headers, config, html) {

                    $timeout(function () {
                        window.location = "#/referral-thankyou";
                        //redirectWithErrorMessage("/error",data)
                    }, 300)
                }).error(function (response, status, headers, config) {
                    redirectWithErrorMessage("#/error", response)
                }).then(function (response, data, status, headers, config, html) {

                })
            }
        };

        //utility function to find the nearest location to you
        function findNearestMDAnderson(coords) {
            var closest;
            var closestArray = [];
            for (var i = 0; i < $scope.locationList.length; i++) {
                var latDelta = coords.lat - $scope.locationList[i].latitude;
                var longDelta = coords.long - $scope.locationList[i].longitude;
                var distSqared = (latDelta * latDelta) + (longDelta * longDelta);
                $scope.locationList[i].distance = Math.sqrt(distSqared);
                //$scope.locationList[i].name = $scope.locationList[i].name;// + " " + Math.sqrt(distSqared)
                $scope.locationPredicate = 'distance';
                closestArray.push($scope.locationList[i].distance)
            }
            closest = closestArray.indexOf(Math.min.apply(Math, closestArray));
            return closest;
        }

        function checkProviders() {
            $scope.formData.provider = checkUser.getCookieValue("PROVIDERID");
            formAPIService.getRapidReferralFormProviders().success(function (response) {
                $scope.providersList = response.providers;
                if ($scope.providersList.length > 1) {
                    $scope.showProviderSelect = true
                } else {
                    $scope.formData.provider = checkUser.getCookieValue("PROVIDERID");
                }
            }).error(function (response) {
                console.log("FAIL! I did not get the Providers" + response.errorResolution)
            });
        }

        function getLocations() {
            formAPIService.getLocations()
                .success(function (response, data, headers, config) {
                    if (response.success === "true") {
                        $scope.locationList = response.clinics;
                        console.log(response.clinics)
                        $scope.physicianList = [
                            {id: 'X', label: "No Preference", firstName: 'Other', lastName: "", location: "any", locationName: ""}
                        ];
                        for (var l = 0; l < $scope.locationList.length; l++) {
                            for (var p = 0; p < $scope.locationList[l].physicians.length; p++) {
                                $scope.locationList[l].physicians[p].id = $scope.locationList[l].physicians[p].firstName + " " + $scope.locationList[l].physicians[p].lastName;
                                $scope.locationList[l].physicians[p].location = $scope.locationList[l].clinicName;
                                $scope.locationList[l].physicians[p].locationName = $scope.locationList[l].clinicName;
                                $scope.locationList[l].physicians[p].label = $scope.locationList[l].physicians[p].firstName + " " + $scope.locationList[l].physicians[p].lastName;
                                $scope.physicianList.push($scope.locationList[l].physicians[p])
                            }
                            //for each physician, what location do they serve, add this to an array object

                        }
                        //for each physician, go through the locations, then through the physicians, if the physician is in the list, add the location to a array in the physicians
                        for (var o = 0; o < $scope.physicianList.length; o++) {
                            $scope.physicianList[o].locationsList = [];
                            for (var m = 0; m < $scope.locationList.length; m++) {
                                for (var n = 0; n < $scope.locationList[m].physicians.length; n++) {
                                    if ($scope.locationList[m].physicians[n].id === $scope.physicianList[o].id) {
                                        $scope.physicianList[o].locationsList.push($scope.locationList[m].clinicName)
                                    }
                                }
                            }
                        }
                    } else if (response.success = "false") {
                        insecureAPIFailResponse("getClinics", data)
                    }
                }).error(function (response, data, status, headers, config) {
                    if (response.success = "false") {
                        insecureAPIFailResponse("getClinics", response);
                    }
                    //forceLogout()
                })

        }

        function getRapidReferralFormDiagnoses() {
            formAPIService.getRapidReferralFormDiagnoses().success(function (response) {
                if (response.success === "true") {
                    $scope.diagnosesList = response.diseases;
                } else if (response.success = "false") {
                    insecureAPIFailResponse("getClinics", data)
                }
            }).error(function (response, data, status, headers, config) {
                if (response.success = "false") {
                    insecureAPIFailResponse("getRapidReferralFormDiagnoses", response)
                    return
                }
                forceLogout()
            })
        }

        function insecureAPIFailResponse(serviceName, data) {
            console.log("The API Service " + serviceName + " Failed, With response: " + data.errorResolution);
            //forceLogout()
            //redirectWithErrorMessage("#/error", data)
        }

        function redirectWithErrorMessage(newLocation, messageObject) {
            formErrorMessageService.passResponse(messageObject)
            window.location = newLocation;
        }

        function forceLogout() {
            $timeout(function () {
                console.log("Timeout");
                //window.location = "#/timeout";
            }, 1000);
        }

        $scope.submitForm = function () {
            var data = $scope.formData;
            formAPIService.newRapidReferralFormPOST(data).success(function (response, data, status, headers) {
                $timeout(function () {
                    window.location = "#/referral-thankyou";
                    //redirectWithErrorMessage("/error",data)
                }, 300)
            }).error(function (response, data, status, headers, config) {
                redirectWithErrorMessage("#/error", response)
            }).then(function (response, data, status, headers, config, html) {

            });
        };

        //get the list of locations
        getLocations();
        //call the get Diagnosis on load
        getRapidReferralFormDiagnoses();
        //get the providers
        checkProviders();
    })
    .controller('gynOncTrialsFilter', function ($scope, formAPIService,$timeout) {
        //need to create two objects here, the form object & the response object, both need to be modified on each select option update

        $scope.forms = [];
        $scope.formOptionsModels = [];
        $scope.forms2 = [];
        $scope.recursionCount = 0;
        $scope.formsCount = 0;
        $scope.filteredTrials = [];
        $scope.trialsValidation = false;
        $scope.trialsSelectedCount = 0;
        $scope.sendData = {};
        $scope.phoneFormats = "";

        function getInputs(parent) {
            formAPIService.getFilterInputs(parent).success(function (response, data) {
                if (parent=="init"){
                    $scope.forms = response[0].formElements;
                }
                console.log($scope.forms);
                for (var e = 0; e < $scope.forms.length; e++) {
                    var modelObject = {}
                    modelObject.ID = $scope.forms[e].formId;
                    modelObject.modelData = undefined;
                    $scope.formOptionsModels.push(modelObject);
                    $scope.forms[e].modelData = undefined;
                    if ($scope.forms[e].type === 'select') {
                        //get the options
                        getSelectOptions($scope.forms[e].id, e);
                    }
                }
            }).error(function (response, data) {
            })
        }

        function getSelectOptions(id,a,b,c,d) {
            //TODO modify to get desendent options
            console.log(id)
            formAPIService.getGynOncOptions(id).success(function (response, data) {
                console.log(response);
                if(d===undefined){
                    if(c===undefined){
                        if(b===undefined){
                            //only do work with a value
                            $scope.forms[a].options = response;
                            return;
                        } else if (b!=undefined) {
                            //TO DO the recursion still kills me on the child items
                            if ($scope.recursionCount < 1){
                            $scope.forms[a].children[b].options = response;
                            return;
                            }
                            $scope.recursionCount+=1;
                            return
                        }
                    }else if(c!=undefined){
                        $scope.forms[a].children[b].children[c].options = response;
                    }
                    return
                }
            }).error(function (response, data) {
                console.log(response)
            });
        }

        function getChildren(parent, a, b, c, d) {
            console.log(parent)
            formAPIService.getGynOncChildren(parent).success(function (response, data) {
                if(!response.noChildren){
                    if(d===undefined){
                        if(c===undefined){
                            if(b===undefined){
                                //only do work with a value
                                $scope.forms[a].children = response.formOptions;
                                $scope.formOptionsModels[a].children=[];
                                for (var child = 0; child < $scope.forms[a].children.length; child++) {
                                    getSelectOptions($scope.formOptionsModels[a].modelData.ID+$scope.forms[a].children[child].ID, a,child);
                                    var childModel = {}
                                    childModel.ID=$scope.formOptionsModels[a].modelData.ID+$scope.forms[a].children[child].ID;
                                    childModel.modelData=undefined;
                                    $scope.formOptionsModels[a].children.push(childModel);
                                }
                            } else if(b!=undefined){
                                $scope.forms[a].children[b].children=response.formOptions;
                                $scope.formOptionsModels[a].children[b].children=[];
                                for (var gchild = 0; gchild<$scope.forms[a].children[b].children.length;gchild++){
                                    getSelectOptions($scope.formOptionsModels[a].modelData.ID+$scope.formOptionsModels[a].children[b].modelData.ID+$scope.forms[a].children[b].children[gchild].ID, a,b,gchild);
                                    var gchildModel = {};
                                    gchildModel.ID=$scope.formOptionsModels[a].children[b].modelData.ID+$scope.forms[a].children[b].children[gchild].ID;
                                    gchildModel.modelData=undefined;
                                    $scope.formOptionsModels[a].children[b].children.push(gchildModel)
                                }
                            }
                            //TODO do something here if c is NOT undefined
                        }
                    }
                } else if(response.noChildren){
                    //console.log(response.noChildren)
                }
                //stop the recursion
                return;
            })
        }

        function changeChild(parentValue,a){

            if(!angular.isUndefined(parentValue.children)){
                for (var b=0;b<parentValue.children.length;b++){

                    if($scope.formOptionsModels[a].children[b].modelData!=undefined){
                        changeGChild(parentValue.children[b],a,b)
                    }
                }
            } else {
                console.log("getCHildren1");
                console.log($scope.forms[a].ID);
                console.log($scope.formOptionsModels[a].modelData.ID);
                getChildren($scope.forms[a].ID + $scope.formOptionsModels[a].modelData.ID, a)
            }
        }

        function changeGChild(childValue,a,b){
            if(childValue.children!=undefined){
                for(var c=0;c<$scope.formOptionsModels[a].children[b].children.length;c++){
                    if($scope.formOptionsModels[a].children[b].children[c].modelData!=undefined){
                        //The grandchild changed
                    }
                }
            } else {
                console.log("getCHildren2");
                getChildren($scope.forms[a].ID + $scope.formOptionsModels[a].modelData.ID + $scope.formOptionsModels[a].children[b].modelData.ID, a, b)
            }
        }

        function submitSearchObject(){
            formAPIService.postGynOncFilter($scope.formOptionsModels).success(function(response,data){
                //this is to remove trials from the list that are not in the response
                for (var l=0;l<$scope.filteredTrials.length;l++){
                    var inResponse = false;
                    for (var d=0;d<response.list.length;d++){
                        if ($scope.filteredTrials[l].id===response.list[d].id){
                            inResponse = true;
                        }
                    }
                    if(inResponse!==true){
                        $scope.filteredTrials.splice(l,1)
                    }
                }
                //this function is for adding new trials to the list
                for (var r = 0; r < response.list.length; r++) {
                    var thisExists = false;
                    var filterLocal = false;
                    for(var e=0;e<$scope.filteredTrials.length;e++){
                        if (response.list[r].id===$scope.filteredTrials[e].id){
                            thisExists = true;
                        }
                    }
                    if(thisExists!==true){
                        $scope.filteredTrials.push({
                            id: response.list[r].id,
                            description: response.list[r].description,
                            protocol: response.list[r].protocol,
                            title: response.list[r].title,
                            selected:false
                        });
                    }
                }
            })
        }

        $scope.$watch('[forms2,formOptionsModels,sendData.PhoneNumber]',function(newValue,oldValue){
            console.log("look here 1");
            console.log($scope.formOptionsModels);
            console.log(newValue);
            console.log(oldValue);
            $scope.formsCount = 0;
            //make sure the values have really changed
            if(oldValue[1]!=newValue[1]){
                console.log("change detected")
                //then go through parent input to see what changed
                //TODO rewrite with angular foreach
                for(var a = 0;a<newValue[1].length;a++){
                    if(!angular.isUndefined(newValue[1][a].modelData)){
                        //todo add if children
                            if (newValue[1][a].modelData!=oldValue[1][a].modelData) {
                                if(a===0){
                                    if(newValue[1][a].modelData.length>3){
                                        $scope.formsCount+=1
                                    }
                                }else{
                                    $scope.formsCount+=1
                                }
                            }
                        if(!angular.isUndefined(oldValue[1][a].modelData)) {
                            if (newValue[1][a].modelData.ID != oldValue[1][a].modelData.ID) {
                                $scope.formOptionsModels[a].children=undefined;
                                $scope.forms[a].children=undefined;
                            }
                        }else{
                                changeChild(newValue[1][a],a)
                            }
                        if(!angular.isUndefined(oldValue[1][a].children)){
                            //todo check to see if we need to reset a child value
                            if(!angular.isUndefined(newValue[1][a].children)){
                                for (var b=0;b<oldValue[1][a].children.length;b++){
                                    if(!angular.isUndefined(oldValue[1][a].children[b].modelData)){
                                        if(newValue[1][a].children[b].modelData.ID!==oldValue[1][a].children[b].modelData.ID){
                                            if(!angular.isUndefined(oldValue[1][a].children[b].children)){
                                                $scope.formOptionsModels[a].children[b].children=undefined;
                                                $scope.forms[a].children[b].children=undefined;
                                            }
                                        }
                                    }
                                }
                            }
                            changeChild(newValue[1][a],a)
                        }
                    }
                }//ends the loop
            }

            if (newValue[2]) {
                if (newValue[2] != oldValue[2]) {
                    if (newValue[2].length == 10) {
                        $scope.phoneFormats = '(999) 999-9999';
                    } else if (newValue[2].length != 10) {
                        $scope.phoneFormats = '';
                    }
                    return;
                }
            }
            //console.log($scope.formsCount)
            if($scope.formsCount>0)
                submitSearchObject();
        },true);

        $scope.watchSelected = function(){
            var tempWatch = false;
            var selectedTrials = [];
            $scope.trialsSelectedCount = 0;
            for (var v=0;v<$scope.filteredTrials.length;v++){
                if($scope.filteredTrials[v].selected===true){
                    tempWatch=true;
                    var tempTrial = {};
                    tempTrial.id = $scope.filteredTrials[v].id;
                    tempTrial.protocol = $scope.filteredTrials[v].protocol;
                    tempTrial.title = $scope.filteredTrials[v].title;
                    selectedTrials.push(tempTrial)
                } else if($scope.filteredTrials[v].selected===false){
                }
            }
            if(tempWatch===true){
                $scope.trialsValidation=true;
            } else if(tempWatch===false){
                $scope.trialsValidation=false;
            }
            $scope.sendData.trials = selectedTrials;
        };
        //TODO - make this a service aor directive and remove from controllers
        $scope.phoneKey = function ($event) {
            if ($scope.sendData.PhoneNumber) {
                if ($scope.sendData.PhoneNumber.length == 10) {
                    $scope.phoneFormats = '';
                }
            }
        };

        $scope.checkValid = function () {
            console.log($scope.trialsFilter.$error)
        };

        $scope.submitForm = function () {
            var data = $scope.sendData;

            formAPIService.postTrialsInquiry(data).success(function (response, data, status, headers) {
                console.log(response)
                $timeout(function () {
                    window.location = "#/trials-confirmation";
                    //redirectWithErrorMessage("/error",data)
                }, 300)
            }).error(function (response, data, status, headers, config) {
                redirectWithErrorMessage("#/error", response)
            }).then(function (response, data, status, headers, config, html) {

            });
        };

        getInputs("init");
    })
    .controller('trialsConfirmation',['$scope',function($scope){
console.log("foo")
    }])
    .controller('bodyUIController', ['$scope', function ($scope) {

    }])

    .controller('NavCtrl', function ($scope, $route, $routeParams, $location) {
        $scope.navLinks = [
            {title: 'Home', link: '/physicians/', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},
            {title: 'Rapid Referral Form', link: '/physicians/mobile/', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},
            {title: 'Refer a Patient', link: '/physicians/referral/form.cfm', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},
            {title: 'Pathology Consultation', link: '/physicians/referral/consult/form.cfm', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},
            {title: 'Personal Health Record', link: '/emr.cfm', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},
            {title: 'Update Address', link: '/physicians/contactinfo/', location: [
                {id: 'side'}
            ], subNav: [], ext: "", class: ""},
            {title: 'Secure Messaging', link: '/physicians/messaging/', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},
            {title: 'Change Profile', link: '/physicians/profile/', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},
            {title: 'Staff Manager', link: '/physicians/user/', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},
            {title: 'Physician Relations', link: '/physicians/relations.cfm', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},
            {title: 'How to Refer', link: '/physicians/referralprocess.cfm', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},
            {title: 'Resources and Links', link: '/physicians/resources.cfm', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: ""},

            {title: 'Help', link: '/physicians/help.cfm', location: [
                {id: "side"}
            ], subNav: [], ext: "", class: "fa fa-exclamation-circle"},
            {title: 'Logout', link: '/logout.cfm', location: [
                {id: "topRow"},
                {id: "side"}
            ], subNav: [], ext: "", class: "fa fa-external-link"},

            {title: 'Legal Statements', link: '/misc', location: [
                {id: "footer"}
            ], subNav: [], ext: "", class: ""},

            {link: "/privacy", title: "Privacy and Security Policy", ext: "", location: [
                {id: "footer"}
            ], subNav: [], class: ""},
            {link: "http://www.mdanderson.org/misc/compact/", title: "Compact With Texans", ext: "_blank", location: [
                {id: "footer"}
            ], subNav: [], class: ""},
            {link: "http://www.state.tx.us/", title: "State of Texas Home Page", ext: "_blank", location: [
                {id: "footer"}
            ], subNav: [], class: ""},
            {link: "http://www.tsl.state.tx.us/trail/", title: "Statewide Search", ext: "_blank", location: [
                {id: "footer"}
            ], subNav: [], class: ""},
            {link: "http://www.window.state.tx.us/comptrol/expendlist/cashdrill.php", title: "State Comptroller - Where the Money Goes", ext: "_blank", location: [
                {id: "footer"}
            ], subNav: [], class: ""},

            {title: 'MD Anderson Cancer Center on Facebook', link: 'http://www.facebook.com/MDAnderson', location: [
                {id: "footerSocial"}
            ], subNav: [], ext: "", class: "fui-facebook"},
            {title: 'MD Anderson Cancer Center on Twitter', link: 'http://www.twitter.com/mdandersonnews', location: [
                {id: "footerSocial"}
            ], subNav: [], ext: "", class: "fui-twitter"},
            {title: 'MD Anderson Cancer Center on Google+', link: 'http://plus.google.com/+mdanderson/', location: [
                {id: "footerSocial"}
            ], subNav: [], ext: "", class: "fui-googleplus"},
            {title: 'MD Anderson Cancer Center on Pinterest', link: 'http://pinterest.com/mdandersoncc/', location: [
                {id: "footerSocial"}
            ], subNav: [], ext: "", class: "fui-pinterest"},
            {title: 'MD Anderson Cancer Center on LinkedIn', link: 'http://www.linkedin.com/company/md-anderson-cancer-center', location: [
                {id: "footerSocial"}
            ], subNav: [], ext: "", class: "fui-linkedin"}


        ];
        $scope.isActive = false;
        $scope.sideMenu = function (link) {
            for (var l = 0; l < link.location.length; l++) {
                if (link.location[l].id === "side")
                    return true;
            }
        };
        $scope.footerMenu = function (link) {
            for (var l = 0; l < link.location.length; l++) {
                if (link.location[l].id === "footer")
                    return true;
            }
        };
        $scope.topRowMenu = function (link) {
            for (var l = 0; l < link.location.length; l++) {
                if (link.location[l].id === "topRow")
                    return true;
            }
        };
        $scope.topDropMenu = function (link) {
            for (var l = 0; l < link.location.length; l++) {
                if (link.location[l].id === "topDrop")
                    return true;
            }
        };
        $scope.footerSocialMenu = function (link) {
            for (var l = 0; l < link.location.length; l++) {
                if (link.location[l].id === "footerSocial")
                    return true;
            }
        };

        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.localPageClass = $location.path().slice(1)


    })
;