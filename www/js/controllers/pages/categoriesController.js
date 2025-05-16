angular.module('atendeFacil').controller('categoriesController', ['$scope', '$timeout', 'localDatabase', 
function($scope, $timeout, localDatabase) {
    // Inicialização
    localDatabase.initialData();
    $scope.data = localDatabase.getData();
    $scope.categories = $scope.data.categories;
    const MAX_CARACTERES = 100;
    
    // Modelo para nova categoria
    $scope.novaCategoria = { nome: '' };
    $scope.contador = MAX_CARACTERES;

    // Atualiza contador de caracteres
    $scope.atualizarContador = function() {
        $scope.contador = MAX_CARACTERES - ($scope.novaCategoria.nome?.length || 0);
        document.getElementById('contadorCaracteres').textContent = $scope.contador;
    };

    // Salva nova categoria
    $scope.salvarCategoria = function() {
        if ($scope.novaCategoria.nome?.trim()) {
            localDatabase.addCategories($scope.novaCategoria.nome.trim());
            $scope.categories = localDatabase.getData().categories;
            $scope.resetarFormulario();
            
            // Fechar modal
            var modalEl = document.getElementById('meuModal');
            var modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) {
                modal.hide();
            }
            
            // Ajusta tamanhos após adicionar nova categoria
            $timeout($scope.adjustTitleSizes, 300);
        }
    };

    // Remove categoria
    $scope.removeCategory = function(categoryId) {
        if (confirm('Tem certeza que deseja remover esta categoria e todas suas frases?')) {
            localDatabase.deleteCategories(categoryId);
            $scope.categories = localDatabase.getData().categories;
            
            // Ajusta tamanhos após remover categoria
            $timeout($scope.adjustTitleSizes, 300);
        }
    };

    // Reseta formulário
    $scope.resetarFormulario = function() {
        $scope.novaCategoria = { nome: '' };
        $scope.contador = MAX_CARACTERES;
        document.getElementById('contadorCaracteres').textContent = MAX_CARACTERES;
    };


    $scope.handleCardClick = function(categoryId) {
  
        console.log('Card clicado:', categoryId);
        $location.path('/category/' + categoryId);
    };

    $scope.removeCategory = function(event, categoryId) {
        event.stopPropagation(); 
        if (confirm('Tem certeza que deseja remover esta categoria?')) {
            localDatabase.deleteCategories(categoryId);
            $scope.categories = localDatabase.getData().categories;
        }
    };

}]);
