var myApp2=angular.module("productApp",['ngRoute']);
myApp2.constant("resturl","");
myApp2.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about/:aboutItem', {
        templateUrl: 'partials/aboutus/index.html',
        controller: 'aboutusCtrl'
    });
    $routeProvider.when('/news/', {
        templateUrl: 'partials/news/index.html',
        controller: 'newsCtrl'
    });

    $routeProvider.when('/news/:id', {
        templateUrl: 'partials/news/detail.html',
        controller: 'newsDetailCtrl'
    });

    $routeProvider.when('/products/', {
        templateUrl: 'partials/productscenter/index.html',
        controller: 'productscenterCtrl'
    });

    $routeProvider.when('/products/:id', {
        templateUrl: 'partials/products/detail.html',
        controller: 'productDetailCtrl'
    });

    $routeProvider.when('/cases/:category', {
        templateUrl: 'partials/cases/detail.html',
        controller: 'caseDetailCtrl'
    });

    $routeProvider.when('/', {
        templateUrl: 'partials/products/index.html',
        controller: 'productCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});

}])

myApp2.controller("newsCtrl",function($scope,$routeParams,$http,resturl){
    $scope.data = {};
    $scope.loadNews = function(){
        $http.get(resturl+"/api/news/").success(function(data){
            if(data!=null){
                $scope.data.news = data;
            }else{
                $scope.data.news = {};
                console.log('Error:Failed to fecth products!')
            }
        })
    }
    $scope.loadNews();

});

myApp2.controller("newsDetailCtrl",function($scope,$routeParams,$http,resturl){
    $scope.currentNewsId = $routeParams["id"];
    $scope.data = {};
    $scope.loadOneNewsById = function(){
        $http.get(resturl+"/api/news/"+$scope.currentNewsId).success(function(data){
            if(data!=null){
                $scope.data.currentNews = data;
            }else{
                $scope.data.currentNews = {};
                console.log('Error:Failed to fecth news!')
            }
        })
    }
    $scope.loadOneNewsById();

});

myApp2.controller("productscenterCtrl",function($scope,$routeParams,$http,resturl){
    $scope.aboutUSStyle={"display":"none"};
    $scope.data = {};
    $scope.loadCases = function(){
        $http.get(resturl+"/api/case/").success(function(data){
            if(data!=null){
                $scope.data.cases = data;
                $scope.data.cases.forEach(function(e){
                    if(e.category==='youxianyuan'){
                        e.hanyuCategory = '医学有限元分析';
                    } else if(e.category==='yiliaomoxing'){
                        e.hanyuCategory = '3D打印高端医疗模型';
                    } else if(e.category==='taihejin'){
                        e.hanyuCategory = '3D打印钛合金植入物';
                    } else {
                        e.hanyuCategory = '未知';
                    }
                })
            }else{
                $scope.data.cases = {};
                console.log('Error:Failed to fecth products!')
            }
        })
    }
    $scope.loadCases();

});



myApp2.controller("productCtrl",function($scope,$routeParams,$http,resturl){
    $scope.aboutUSStyle={"display":"none"};
    $scope.data = {};
    $scope.loadProducts = function(){
        $http.get(resturl+"/api/product/").success(function(data){
            if(data!=null){
                $scope.data.products = data;
            }else{
                $scope.data.products = {};
                console.log('Error:Failed to fecth products!')
            }
        })
    }

    $scope.loadNews = function(){
        $http.get(resturl+"/api/news/").success(function(data){
            if(data!=null){
                $scope.data.news = data;
            }else{
                $scope.data.news = {};
                console.log('Error:Failed to fecth products!')
            }
        })
    }
    $scope.loadNews();

    $scope.loadProducts();


    $scope.showAllAboutUs = function(statusOfShow){
        console.log(statusOfShow);
        if(statusOfShow=='true'){
            $scope.aboutUSStyle={"display":"block"};
        }else{
            $scope.aboutUSStyle={"display":"none"};
        }

    }

});

myApp2.controller("productDetailCtrl",function($scope,$routeParams,$http,resturl){
    $scope.currentCategory = $routeParams["id"];
    $scope.data = {};
    $scope.loadOneProductById = function(){
        $http.get(resturl+"/api/product/"+$scope.currentCategory).success(function(data){
            if(data!=null){
                $scope.data.currentProduct = data;
            }else{
                $scope.data.currentProduct = {};
                console.log('Error:Failed to fecth products!')
            }
        })
    }
    $scope.loadOneProductById();

});

myApp2.controller("caseDetailCtrl",function($scope,$routeParams,$http,resturl){
    $scope.currentCategory = $routeParams["category"];
    $scope.data = {};
    $scope.loadOneCaseByCategory = function(){
        $http.get(resturl+"/api/case/"+$scope.currentCategory).success(function(data){
            if(data!=null){
                $scope.data.currentCase = data;
                if($scope.data.currentCase.category==='youxianyuan'){
                    $scope.data.currentCase.hanyuCategory="医学有限元分析";
                } else if($scope.data.currentCase.category==='yiliaomoxing'){
                    $scope.data.currentCase.hanyuCategory="3D打印高端医疗模型";
                } else if($scope.data.currentCase.category==='taihejin'){
                    $scope.data.currentCase.hanyuCategory="3D打印钛合金植入物";
                } else {
                    $scope.data.currentCase.hanyuCategory="未知";
                }
            }else{
                $scope.data.currentCase = {};
                console.log('Error:Failed to fecth products!')
            }
        })
    }
    $scope.loadOneCaseByCategory();

});


myApp2.controller("aboutusCtrl",function($scope,$routeParams,$http,resturl){
    $scope.data = {};
    var currentPageId = $routeParams["aboutItem"];
    if(currentPageId=="about_contact"){
        $scope.currentPage="联系我们";
    } else if(currentPageId=="about_us"){
        $scope.currentPage="公司介绍";
    } else if(currentPageId=="about_intro"){
        $scope.currentPage="关于我们";
    } else if(currentPageId=="about_team"){
        $scope.currentPage="团队介绍";
    } else if(currentPageId=="about_hire"){
        $scope.currentPage="招贤纳士";
    } else{
        $scope.currentPage="关于我们";
    }

    $http.get(resturl+"/api/about/"+currentPageId).success(function(data){
        if(data!=null){
            $scope.data.introductionData = data;
        }else{
            $scope.data.introductionData = {};
            console.log('Error:Failed to fecth products!')
        }
    })



});

myApp2.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);

// myApp2.animation('.slide', function() {
//     var NG_HIDE_CLASS = 'ng-hide';
//     return {
//         beforeAddClass: function(element, className, done) {
//             if(className === NG_HIDE_CLASS) {
//                 element.slideUp(done);
//             }
//         },
//         removeClass: function(element, className, done) {
//             if(className === NG_HIDE_CLASS) {
//                 element.hide().slideDown(done);
//             }
//         }
//     }
// });