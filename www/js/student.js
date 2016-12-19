// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var API = 'http://localhost:3000';

var app = angular.module('starter', ['ionic']);

app.controller('StudentController', ['$scope','$http', function($scope, $http) {
    $scope.newStudent = {};
    $scope.students = {};
    $scope.students2 = [];
    $scope.selected = false;
    $scope.sortType;

    $scope.Order = function () {
        $scope.sortType = 'name';
       // $scope.OrderDo = 'value';
    };
    $scope.orderStudentsbyNumber = function () {
        $scope.sortType = '+students2.num';
    };

    /*** OK ***/

    // Función para filtrar por nombre de asignatura

    $scope.filterStudent = function (res) {

        $http.get(API + '/api/students/name/' + $scope.newStudent.name)
            .success(function (data) {
                if (data == false) {
                    alert("No hi ha cap alumne amb aquest nom");
                }
                else {
                    $scope.students = data;
                    $scope.cleanall(); // Borramos los datos del formulario
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.getAll = function () {
        $http.get(API + '/api/students').success(function (data) {
            $scope.students = data;
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        console.log($scope.students.length);
        for (var i=0; i < $scope.students.length; i++) {
            console.log("entra en for");
            var name=$scope.students[i].name;
            $http.get(API + '/api/subjects/student/' + $scope.students[i]._id)
                .success(function (data) {
                    console.log(data);
                    console.log(i);
                    if (data == false) {
                        $scope.students2.push({
                            num: '0',
                            name: name
                        });
                    }
                    else {
                        $scope.subjects = data;
                        $scope.students2.push({
                            num: $scope.subjects.length,
                            name: name
                        });
                        //$scope.students2[i].num = $scope.subjects.length;
                       // console.log($scope.subjects.length);
                    }
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    }

    // Obtenemos todos los datos de la base de datos
    $http.get(API + '/api/students').success(function (data) {
        $scope.students = data;
    })
        .error(function (data) {
            console.log('Error: ' + data);
        });


    // Función para registrar a un estudiante

    $scope.registrarStudent = function (res) {

        if (confirm("Ets " + $scope.newStudent.name + "?")) {
            $http.post(API + '/api/students', $scope.newStudent)
                .success(function (data) {
                    $scope.cleanall(); // Borramos los datos del formulario
                    $scope.students = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
        location.reload(); // soluciona un problema con la tabla
    };

    // Función para editar los datos de un estudiante

    $scope.modificarStudent = function (newStudent) {
        $http.put(API + '/api/students/' + $scope.newStudent._id, $scope.newStudent)
            .success(function (data) {
                $scope.cleanall(); // Borramos los datos del formulario
                $scope.students = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función que borra un objeto student conocido su id
    $scope.borrarStudent = function (newStudent) {
        $http.delete(API + '/api/students/' + $scope.newStudent._id)
            .success(function (data) {
                $scope.cleanall();
                $scope.students = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };


    $scope.registrarPhone = function (newStudent) {
        $http.post(API + '/api/students/' + $scope.newStudent._id, $scope.newStudent)
            .success(function (data) {
                if (data == false) {
                    alert("El número de telèfon no es vàlid");
                }
                else {
                    $scope.cleanall(); // Borramos los datos del formulario
                    $scope.students = data;
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        location.reload(); // soluciona un problema con la tabla

    }


    $scope.borrarPhone = function (newStudent) {
        $http.delete(API + '/api/students/' + $scope.newStudent._id + '/' + $scope.newStudent.phone_id)
            .success(function (data) {
                $scope.cleanall();
                $scope.students = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        location.reload(); // soluciona un problema con la tabla
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectStudent = function (student) {
        $scope.newStudent = student;
        $scope.selected = true;
        console.log($scope.newStudent, $scope.selected);


    };

    $scope.selectPhone = function (phone) {
        $scope.newStudent.type = phone.type;
        $scope.newStudent.number = phone.number;
        $scope.newStudent.phone_id = phone._id;
        $scope.selected = true;
        console.log($scope.newStudent, $scope.selected);
    };

    $scope.cleanall = function () {
        $scope.newStudent = {};

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
