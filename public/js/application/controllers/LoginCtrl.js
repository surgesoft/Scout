angular.module('observer-webclient')

.controller('LoginCtrl', ['$cookieStore', '$scope', '$http', '$rootScope', 'alertHandler', '$location', '$base64' ,'sessionManager', 'userMgr', function ($cookieStore, $scope, $http, $rootScope, alertHandler, $location, $base64, sessionManager, userMgr) {
    $scope.user = $cookieStore.get('user');

    $scope.login = {
        email : "",
        password : "",
        remember : false
    };

    var loginErrorHandle = function (err) {
        alertHandler.alert('danger', err.data.error)
    };

    var loginSucceesHandle = function (result) {
        var credentials = "Basic " + $base64.encode($scope.login.email + ":" + $scope.login.password);
        $cookieStore.put('credentials', credentials);
        if ($scope.login.remember) {
            $cookieStore.put('user', result.data);  
            userMgr.setUser(result.data);
        }
        sessionManager.setAuthorization();
        alertHandler.alert('success', "login success!", function () {
            $location.path("/"); 
        });

    };

    $scope.doLogin = function () {
        $http.post('/login', $scope.login).then(loginSucceesHandle, loginErrorHandle);
    };


}]);