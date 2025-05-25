// Cria o módulo de componentes
angular.module('atendeFacil.components', []);

// Cria o módulo principal
var app = angular.module('atendeFacil', ['ngRoute', 'atendeFacil.components'])

// ########################## FUNÇÕES GLOBAIS ##########################
app.run(['$rootScope', '$location', function ($rootScope, $location) {

    $rootScope.goToPath = function (path) { // Função global para navegação de rotas
        $location.path(path)
    }

    $rootScope.section = function (index) { // função para active do botao
        const path = $location.path() //pegar a page
        if (path.indexOf(index) === 0) return true // se o url da page for true ele retorna true
    }
}])
// ########################## FUNÇÕES GLOBAIS ##########################
