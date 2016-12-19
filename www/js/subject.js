// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var app = angular.module('starter', ['ionic']);
var API='http://localhost:3000';

app.controller('SubjectController', ['$scope','$http', function($scope, $http) {
    $scope.newSubject = {};
    $scope.subjects = {};
    $scope.selected = false;

    $scope.OrderDo = {};

    $scope.Order = function (value) {
        $scope.OrderDo = value;
    };
    $scope.orderSubjectbyNumberbyLess = function () {
        $scope.OrderDo = '-newSubject.students.length';
    };
    $scope.orderSubjectbyNumber = function () {
        $scope.OrderDo = '+newSubject.students.length';
        console.log($scope.OrderDo);
    };


    $scope.cleanall = function () {
        $scope.newSubject = {};
    };

    /*** OK ***/

    $http.get(API + '/api/subjects').success(function (data) {
        $scope.subjects = data;
    })
        .error(function (data) {
            console.log('Error: ' + data);
        });


    // Función para filtrar por alumno

    $scope.filterSubject = function (res) {

        $http.get(API + '/api/subjects/' + $scope.newSubject.students)
            .success(function (data) {
                if (data == false) {
                    alert("L'alumne no té cap assignatura");
                }
                else {
                    $scope.subjects = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

    /*** OK ***/

    // Función para filtrar por nombre de asignatura

    $scope.filterSubject = function (res) {

        $http.get(API + '/api/subjects/name/' + $scope.newSubject.name)
            .success(function (data) {
                if (data == false) {
                    alert("No hi ha cap assignatura amb aquest nom");
                }
                else {
                    $scope.subjects = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

    /*** OK ***/

    // Función para filtrar por periodo

    $scope.filterSubjectbyPeriod = function (res) {

        $http.get(API + '/api/subjects/period/' + $scope.newSubject.periode)
            .success(function (data) {
                if (data == false) {
                    alert("No hi ha cap assignatura en aquest període");
                }
                else {
                    $scope.subjects = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

    // Función para filtrar alfabéticamente

    $scope.filterSubjectbyName = function (res) {

        $http.post('/api/subjectsbyname', $scope.newSubject)
            .success(function (data) {
                if (data == false) {
                    alert("No hi ha assignatures");
                }
                else {
                    $scope.subjects = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

    // Función para filtrar per nombre d'alumnes
    $scope.filterSubjectbyNumber = function (res) {

        $http.get('/api/subjects', $scope.newSubject)
            .success(function (data) {
                if (data == false) {
                    alert("No hi ha assignatures");
                }
                else {
                    $scope.subjects = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

    /*** OK ***/

    $scope.addStudentToSubject = function (id) {
        $scope.newStudent = {
            student_id: id
        };
        $http.post(API + '/api/subjects/' + $scope.newSubject._id + '/student/' , $scope.newStudent)
            .success(function(data){
                $scope.subject = data;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    /*** OK ***/

    $scope.borrarStudentFromSubject = function (id) {
        $http.delete(API + '/api/subjects/' + $scope.newSubject._id + '/student/' + id)
            .success(function(data){
                $scope.subject = data;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    /*** OK ***/

    // Función para registrar una asignatura

    $scope.registrarSubject = function (res) {

        $http.post(API + '/api/subjects', $scope.newSubject)
            .success(function (data) {
                $scope.cleanall(); // Borramos los datos del formulario
                $scope.subjects = data;
            })
            .error(function (data) {
                $scope.cleanall(); // Borramos los datos del formulario
                alert(data);
                console.log('Error: ' + data);
            });

    };

    /*** OK ***/

    // Función para editar los datos de una asignatura

    $scope.modificarSubject = function (newSubject) {
        $http.put(API + '/api/subjects/' + $scope.newSubject._id, $scope.newSubject)
            .success(function (data) {
                $scope.cleanall(); // Borramos los datos del formulario
                $scope.subjects = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    /*** OK ***/

    // Función que borra un objeto asignatura conocido su id
    $scope.borrarSubject = function (newSubject) {
        $http.delete(API + '/api/subjects/' + $scope.newSubject._id)
            .success(function (data) {
                $scope.cleanall();
                $scope.subjects = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función para coger el objeto asignatura seleccionado en la tabla
    $scope.selectSubject = function (subject) {
        $scope.newSubject = subject;
        $scope.selected = true;
        console.log($scope.newSubject, $scope.selected);
    };

    $scope.selectStudent = function (student) {
        $scope.newStudent = student;
        $scope.selected = true;
        console.log($scope.newStudent, $scope.selected);
    };
}]);


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
