angular.module('atendeFacil').controller('settingsController', ['$scope', '$location', 'localDatabase', 'confirmModalService', function ($scope, $location, localDatabase, confirmModalService) {
  
    $scope.deleted = function () {
        const dataCategories = localDatabase.getData().categories
        if (!dataCategories || dataCategories.length === 0) {
            return true
        } else {
            return false
        }
    }

    $scope.getSettingsSectionUrl = function () { //joga diferentes includes
        const path = $location.path()
        if (path.indexOf('/settings/general') === 0) return 'pages/settings/settingsGeneral.html'
        if (path.indexOf('/settings/theme') === 0) return 'pages/settings/settingsTheme.html'
        if (path.indexOf('/settings/about') === 0) return 'pages/settings/settingsAbout.html'
    }

    $scope.deleteAll = async () => {
        confirmModalService.initialize()
        const confirmed = await confirmModalService.show({
            title: 'Apagar Dados',
            message: 'Tem certeza que deseja limpar todos os dados do aplicativo?',
            confirmText: 'Apagar',
            cancelText: 'Cancelar'
        });

        if (confirmed) {
            localDatabase.deleteAllData()
            $scope.$applyAsync()
        }
    }


}])