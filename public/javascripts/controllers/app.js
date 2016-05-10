var myApp=angular.module("adminApp",['ui.bootstrap','ngRoute','ngDialog','ngKeditor','ngFileUpload']);
myApp.constant("productRestUrl","/api/product/");
myApp.constant("newsRestUrl","/api/news/");
myApp.constant("aboutRestUrl","/api/about/");
myApp.constant("caseRestUrl","/api/case/");
myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about/:aboutItem', {
        templateUrl: 'about/aboutus.html',
        controller: 'adminAboutCtrl'
    });
    $routeProvider.when('/products/productgroup', {
        templateUrl: 'products/productgroup.html',
        controller: 'adminProductGroupCtrl'
    });

    $routeProvider.when('/products/products', {
        templateUrl: 'products/products.html',
        controller: 'adminProductsCtrl'
    });

    $routeProvider.when('/products/products/:id', {
        templateUrl: 'products/products_edit_template.html',
        controller: 'adminProductsEditCtrl'
    });

    $routeProvider.when('/products/products/case/:id', {
        templateUrl: 'products/products_edit_case_template.html',
        controller: 'adminProductsCaseEditCtrl'
    });

    $routeProvider.when('/products/products_add', {
        templateUrl: 'products/products_add_template.html',
        controller: 'adminProductsAddCtrl'
    });

    $routeProvider.when('/news/news', {
        templateUrl: 'news/news.html',
        controller: 'adminNewsCtrl'
    });

    $routeProvider.when('/news/news/:id', {
        templateUrl: 'news/news_edit_template.html',
        controller: 'adminNewsEditCtrl'
    });

    $routeProvider.when('/news/news_add', {
        templateUrl: 'news/news_add_template.html',
        controller: 'adminNewsAddCtrl'
    });

    $routeProvider.when('/cases/:category', {
        templateUrl: 'cases/cases_edit_template.html',
        controller: 'adminCaseEditCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});

}])
myApp.controller("adminAboutCtrl",function($scope,$routeParams,$http,aboutRestUrl){
    $scope.data = {};
    $scope.config = {width: '1080px',height:'900px',uploadJson:'/upload/'};
    $scope.currentAboutItem = $routeParams["aboutItem"];
    $scope.currentPage="";
    if($scope.currentAboutItem=='about_us'){
        $scope.currentPage="关于我们";
    } else if($scope.currentAboutItem=='about_intro'){
        $scope.currentPage="公司介绍";
    } else if($scope.currentAboutItem=='about_team'){
        $scope.currentPage="团队介绍";
    } else if($scope.currentAboutItem=='about_hire'){
        $scope.currentPage="人才招聘";
    } else if($scope.currentAboutItem=='about_contact'){
        $scope.currentPage="联系我们";
    } else {
        $scope.currentPage="未知页面！错误！";
    }


    $scope.loadAbout = function(){
        $http.get(aboutRestUrl + $scope.currentAboutItem).success(function(data){
            if(data!=null){
                $scope.data = data;
            }else{
                $scope.data.content = "";
            }
        })
    }
    $scope.loadAbout();
    $scope.updateAbout = function(newContentOfAboutUs){
        //We should update $scope.data here
        if($scope.data.id==null){
            alert("Failed to update db!");
        }else{
            $scope.data.content=newContentOfAboutUs;
            $http.put(aboutRestUrl + $scope.currentAboutItem,$scope.data).success(function(){
                //alert("Saved!");
                console.log("Saved!");
            })
        }
    }
});
myApp.controller("adminCtrl",function($scope){
    $scope.day = "Monday!";
});
myApp.controller("adminProductGroupCtrl",function($scope){
    $scope.data={};
    

});
myApp.controller("adminProductsCtrl",function($scope,$http,$location,productRestUrl){
    $scope.data = {};
    $scope.loadProducts = function(){
        $http.get(productRestUrl).success(function(data){
            if(data!=null){
                $scope.data.products = data;
                $scope.data.products.forEach(function(e){
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
                $scope.data.products = {};
                console.log('Error:Failed to fecth products!')
            }
        })
    }
    $scope.loadProducts();

    $scope.addNewProduct = function(){
        // Add new product here

        $location.path("/products/products_add");
    }

    $scope.deleteProduct = function(productId){

        $http.delete(productRestUrl+productId).success(function(){
            console.log("This product is deleted!");
        }).finally(function(){
            $scope.loadProducts();
        });
    }


});

myApp.controller("adminProductsAddCtrl",function($scope,$http,$location,productRestUrl,Upload){
    $scope.data = {};
    $scope.config4productIntro = {width: '1024px',height:'600px',uploadJson:'/upload/'};
    $scope.config4productDetails = {width: '1024px',height:'600px',uploadJson:'/upload/'};
    $scope.data.productPictureUrl = "";
    $scope.createProduct = function(){
        // alert($scope.data.productName);
        // alert($scope.data.productIntro);
        // alert($scope.data.productDetail);
        var productData = {}
        productData.name=$scope.data.name;
        productData.category=$scope.data.category;
        productData.productIntro=$scope.data.productIntro;
        productData.productPictureUrl = $scope.data.productPictureUrl;
        productData.detail=$scope.data.detail;
        $http.post(productRestUrl,productData).success(function(data){
            if(data!=null){
                $scope.data.newProduct = data;
                console.log(data);
            }else{
                $scope.data.newProduct = {};
                console.log('Error:Failed to fecth products!')
            }
        }).error(function(error){
            $scope.data.errorInfo=error;
            console.log("Error in post product!");

        }).finally(function(){
            $location.path("/products/products");
        })
    };

    $scope.uploadPic = function(file,commitOfFile) {

        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        }

        file.upload = Upload.upload({
            url: '/api/picturesupload/uploads',
            data: {file: file},
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

            if(file.progress==100){
                $scope.data.productPictureUrl="upload/productsPictures/"+file.name;
            }
        });
    };

    $scope.addProductPicture = function () {
        var new_dialog = ngDialog.open({
            id: 'fromAService',
            template: 'addNewFilePanel',
            className:'ngdialog-theme-default custom-width',
            controller: 'adminProductsUploadPicutreCtrl',
            data: {scopeData: $scope.data}
        });
    };

});

myApp.controller("adminProductsUploadPicutreCtrl",function($scope,$http,$location,ngDialog,Upload) {
    $scope.uploadPic = function(file,commitOfFile) {

        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        }

        file.upload = Upload.upload({
            url: '/api/picturesupload/uploads',
            data: {file: file},
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            $scope.data.productPictureUrl="/upload/productsPictures/"+file.name;
            if(file.progress==100){
                file.result=true;
                //file.name;
                //$scope.data.allFiles.push({"id":"1000","filename":file.name,"owner":"me","createdate":getNowFormatDate,"commit":commitOfFile})
                console.log(file.name);
                console.log(getNowFormatDate());
                console.log(commitOfFile);
                //$scope.data.allFiles[$scope.data.allFiles.length] = {"id":"1000","filename":file.name,"owner":"me","createdate":getNowFormatDate,"commit":commitOfFile};
                console.log($scope.data.allFiles);

                console.log($scope.data.productPictureUrl);
            }
        });
    }

    $scope.closeAddNewFile = function () {
        ngDialog.close();
    };
});

myApp.controller("adminProductsEditCtrl",function($scope,$http,$location,$routeParams,productRestUrl,$uibModal){
    $scope.data = {};
    $scope.config4productDetails = {width: '1024px',height:'600px',uploadJson:'/upload/'};
    $scope.currentCategory = $routeParams["id"];
    $http.get(productRestUrl+$scope.currentCategory).success(function(data){
        if(data!=null){
            $scope.data = data;
        }else{
            $scope.data = {};
            console.log("No data was get!");
        }
    })



    $scope.updateProduct = function(){
        // var newProduct={};
        // newProduct.name=$scope.data.product.name;
        // newProduct.shortintro=$scope.data.product.shortintro;
        // newProduct.detail=$scope.data.product.detail
        $http.put(productRestUrl+$scope.data._id,$scope.data).success(function(data){
            if(data!=null){
            }else{
                $scope.data = "";
                console.log("Error:Update product failed!");
            }
        }).finally(function(){
            $location.path("/products/products");
        });

    }


    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'adminProductsEditCtrl',
            size: size
        });
    };

});


myApp.controller("adminProductsCaseEditCtrl",function($scope,$http,$location,$routeParams,productRestUrl,$uibModal){
    $scope.data = {};
    $scope.config4productDetails = {width: '1024px',height:'600px',uploadJson:'/upload/'};
    $scope.currentCategory = $routeParams["id"];
    $http.get(productRestUrl+$scope.currentCategory).success(function(data){
        if(data!=null){
            $scope.data = data;
            console.log(data);
        }else{
            $scope.data = {};
            console.log("No data was get!");
        }
    })



    $scope.updateProduct = function(){
        // var newProduct={};
        // newProduct.name=$scope.data.product.name;
        // newProduct.shortintro=$scope.data.product.shortintro;
        // newProduct.detail=$scope.data.product.detail
        $http.put(productRestUrl+$scope.data._id,$scope.data).success(function(data){
            if(data!=null){
            }else{
                $scope.data = "";
                console.log("Error:Update product failed!");
            }
        }).finally(function(){
            $location.path("/products/products");
        });

    }

});

angular.module('adminApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {


    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


myApp.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);


///////////News
myApp.controller("adminNewsCtrl",function($scope,$http,$location,newsRestUrl){
    $scope.data = {};
    $scope.loadNews = function(){
        $http.get(newsRestUrl).success(function(data){
            if(data!=null){
                $scope.data.news = data;
            }else{
                $scope.data.news = {};
                console.log('Error:Failed to fecth news!')
            }
        })
    }
    $scope.loadNews();

    $scope.addNewNews = function(){
        // Add new product here

        $location.path("/news/news_add");
    }

    $scope.deleteNews = function(newsId){

        $http.delete(newsRestUrl+newsId).success(function(){
            console.log("This news is deleted!");
        }).finally(function(){
            $scope.loadNews();
        });
    }


});

myApp.controller("adminNewsAddCtrl",function($scope,$http,$location,newsRestUrl,Upload){
    $scope.data = {};
    $scope.data.newsPictureUrl = "";
    $scope.config4newsDetails = {width: '1024px',height:'600px',uploadJson:'/upload/'};
    $scope.createNews = function(){
        var newsData = {}
        newsData.title=$scope.data.title;
        newsData.shortIntro=$scope.data.shortIntro;
        newsData.newsPictureUrl=$scope.data.newsPictureUrl;
        newsData.content=$scope.data.content;
        $http.post(newsRestUrl,newsData).success(function(data){
            if(data!=null){
                $scope.data.news = data;
                console.log(data);
            }else{
                $scope.data.news = {};
                console.log('Error:Failed to fecth news!')
            }
        }).error(function(error){
            $scope.data.errorInfo=error;
            console.log("Error in post news!");

        }).finally(function(){
            $location.path("/news/news");
        })
    };

    $scope.uploadPic = function(file,commitOfFile) {

        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        }

        file.upload = Upload.upload({
            url: '/api/picturesupload/uploads',
            data: {file: file},
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

            if(file.progress==100){
                $scope.data.newsPictureUrl="upload/productsPictures/"+file.name;
            }
        });
    };

    // $scope.addNewsPicture = function () {
    //     var new_dialog = ngDialog.open({
    //         id: 'fromAService',
    //         template: 'addNewFilePanel',
    //         className:'ngdialog-theme-default custom-width',
    //         controller: 'adminProductsUploadPicutreCtrl',
    //         data: {scopeData: $scope.data}
    //     });
    // };


});

myApp.controller("adminNewsEditCtrl",function($scope,$http,$location,$routeParams,newsRestUrl){
    $scope.data = {};
    $scope.config4newsDetails = {width: '1024px',height:'600px',uploadJson:'/upload/'};
    $scope.currentNewsId = $routeParams["id"];
    $http.get(newsRestUrl+$scope.currentNewsId).success(function(data){
        if(data!=null){
            $scope.data = data;
        }else{
            $scope.data = {};
            console.log("No data was get!");
        }
    })



    $scope.updateNews = function(){
        // var newProduct={};
        // newProduct.name=$scope.data.product.name;
        // newProduct.shortintro=$scope.data.product.shortintro;
        // newProduct.detail=$scope.data.product.detail
        $http.put(newsRestUrl+$scope.data._id,$scope.data).success(function(data){
            if(data!=null){
            }else{
                $scope.data = "";
                console.log("Error:Update product failed!");
            }
        }).finally(function(){
            $location.path("/news/news");
        });

    }

});


myApp.controller("adminCaseEditCtrl",function($scope,$http,$location,$routeParams,caseRestUrl,Upload){
    $scope.data = {};
    $scope.config4CaseDetails = {width: '1024px',height:'600px',uploadJson:'/upload/'};
    $scope.currentCategoryName = $routeParams["category"];
    $scope.categoryPictureUrl = "";
    console.log("Current Category Name:"+$scope.currentCategoryName);
    $http.get(caseRestUrl+$scope.currentCategoryName).success(function(data){
        if(data!=null){
            $scope.data = data;
            console.log("Find data:"+data);
            console.log("Find data:"+data.category);
            if(!data.category){
                var caseData = {}
                caseData.category=$scope.currentCategoryName;
                caseData.content="Edit here！";
                $http.post(caseRestUrl,caseData).success(function(data){
                    if(data!=null){
                        $scope.data = data;
                        console.log($scope.data.category);
                        console.log($scope.data.content);
                    }else{
                        $scope.data.case = {};
                        console.log('Error:Failed to fecth news!')
                    }
                }).error(function(error){
                    $scope.data.errorInfo=error;
                    console.log("Error in post news!");

                }).finally(function(){
                })
            }
            if(data.category==='youxianyuan'){
                $scope.data.hanyuCategory="医学有限元分析";
            } else if(data.category==='yiliaomoxing'){
                $scope.data.hanyuCategory="3D打印高端医疗模型";
            } else if(data.category==='taihejin'){
                $scope.data.hanyuCategory="3D打印钛合金植入物";
            } else {
                $scope.data.hanyuCategory="未知类别";
            }
        }else{
            $scope.data = {};
            console.log("No data was get!");
        }
    })




    $scope.updateCase = function(){
        // var newProduct={};
        // newProduct.name=$scope.data.product.name;
        // newProduct.shortintro=$scope.data.product.shortintro;
        // newProduct.detail=$scope.data.product.detail
        $http.put(caseRestUrl+$scope.data._id,$scope.data).success(function(data){
            if(data!=null){
            }else{
                $scope.data = "";
                console.log("Error:Update product failed!");
            }
        }).finally(function(){
            $location.path("#/");
        });

    }

    $scope.uploadPic = function(file,commitOfFile) {

        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        }

        file.upload = Upload.upload({
            url: '/api/picturesupload/uploads',
            data: {file: file},
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

            if(file.progress==100){
                $scope.data.categoryPictureUrl="upload/productsPictures/"+file.name;
            }
        });
    };

});
