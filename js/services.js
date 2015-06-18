//'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('MDAndersonMobile.services', []).
    value('version', '0.1')
    .factory('formErrorMessageService', function () {
        var messageObject = {};
        var rapidReferralFormErrorMessage = {};

        rapidReferralFormErrorMessage.passResponse = function (errorMessage) {
            messageObject.errorMessage = errorMessage;
        };

        rapidReferralFormErrorMessage.getStoredMessage = function () {
            return messageObject;
        };
        return rapidReferralFormErrorMessage;
    })
    .factory('formAPIService', function ($http, transformRequestAsFormPost, checkUser) {
        var formAPI = {};
        var APIbaseUrl = "http://clinicaltrialsapi.azurewebsites.net/api/v1/";

        formAPI.newRapidReferralFormPOST = function (data) {
            return $http({
                method: 'post',
                url: "https://mydev.mdanderson.org/physicians/ws/Referral.cfc?method=sendReferral",
                transformRequest: transformRequestAsFormPost,
                data: {
                    //referByProviderId: checkUser.getCookieValue("PROVIDERID"),
                    referByUserId: decodeURI(checkUser.getCookieValue("USERID")),
                    referByProviderId:data.provider,
                    diseaseName: data.Diagnosis,
                    referToClinicName: data.Location.clinicName,
                    referToPhysicianName: data.Physician.id,
                    patientFirstName: data.FirstName,
                    patientLastName: data.LastName,
                    patientPhone: data.PhoneNumber,
                    patientDateOfBirth: (data.Date.getMonth() + 1) + '/' + data.Date.getDate() + '/' +  data.Date.getFullYear(),
                    patientGender: data.gender,
                    additionalInfo: data.moreInfo
                }
            })

        };
        formAPI.getLocations = function () {
            return $http({
                url: 'https://mydev.mdanderson.org/ws/main/common/Physician.cfc?method=getPhysiciansByClinic'
            })
        };
        formAPI.getRapidReferralFormProviders = function () {
            var userId = checkUser.getCookieValue("USERID");
            return $http({
                url: "https://mydev.mdanderson.org/physicians/ws/Provider.cfc?method=getProviders&userId=" + userId
            })

        };
        formAPI.checkTimeout = function () {
            return $http({
                url: 'testCFLocation.cfc?method=testRedirect'
            })
        };
        formAPI.checkSession = function () {
            var Session = {
                data: {},
                saveSession: function () {

                },
                updateSession: function () {
                    Session.data = $http.get('testCFLocation.cfc?method=testRedirect').then(function (r) {
                        return r.data;
                    })
                }
            };
            Session.updateSession();
            return Session;
        };
        formAPI.getRapidReferralFormDiagnoses = function () {
            return $http({
                url: 'https://mydev.mdanderson.org/ws/main/common/Disease.cfc?method=getDiseases'
            })
        };
        formAPI.getFilterInputs = function(parent){
            console.log(parent)
            if(parent == "init")
            {
                var group = '/gynonc';
                var APIendpoint = "/groupbyname";
                var trailer = "/?includeFormElements=true";
                return $http({
                    url: APIbaseUrl + APIendpoint + group + trailer
                });
            }
            else
            {
                return $http({
                    url:'/filterInputs/:'+parent
                })
            }
        };
        formAPI.getGynOncInitComponents = function(){
        	var group = '/gynonc';
            var APIendpoint = "/groupbyname";
            return $http({
                //url:'/initComponents/:' + group
                //http://clinicaltrialsapi.azurewebsites.net/api/v1/groupbyname/GynOnc
                url: APIbaseUrl + APIendpoint + group
            });
        };
        formAPI.getGynOncOptions = function(parent){
            var APIEndpoint = "formelementoptions"
            return $http({
                url:APIbaseUrl + APIEndpoint + parent
                //http://clinicaltrialsapi.azurewebsites.net/api/v1/formelementoptions/1
            });
        };
        formAPI.getGynOncChildren = function(parent){
            return $http({
                url:'/children/:'+parent
            });
        };
        formAPI.postGynOncFilter = function(data){
            return $http({
                method:'post',
                url:'/submitfilter',
                data:data
            })
        };
        formAPI.postTrialsInquiry = function(data){
            //console.log(data)
            return $http({
                method:'post',
                url:'/submitinquiry',
                data:data
            })
        };
        return formAPI;
    })
    .factory('checkUser', function () {
        var getUserInfo = {};
        getUserInfo.isMobile = function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
        };
        getUserInfo.getCookieValue = function (cookieId) {
            var allCookies = document.cookie.split(';');
            for (var c = 0; c < allCookies.length; c++) {
                var theCookieId = allCookies[c].split("=");
                while (theCookieId[0].charAt(0) === " ")
                    theCookieId[0] = theCookieId[0].substr(1);
                if (theCookieId[0].toUpperCase() == cookieId.toUpperCase()) {
                    return theCookieId[1]
                }
            }

        };
        return getUserInfo;
    })
    .factory('transformRequestAsFormPost', function () {
        function transformRequest(data, getHeaders) {
            var headers = getHeaders();
            headers["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
            return( serializeData(data));
        }

        return(transformRequest);
        //private methods//
        function serializeData(data) {
            if (!angular.isObject(data)) {
                return((data == null) ? "" : data.toString());
            }
            var buffer = [];

            for (var name in data) {
                if (!data.hasOwnProperty(name)) {
                    continue;
                }
                var value = data[name];
                buffer.push(
                        encodeURIComponent(name) +
                        "=" +
                        encodeURIComponent((value == null) ? "" : value)
                );
            }
            var source = buffer.join("&").replace(/%20/g, "+");
            return (source);
        }
    });

