app.controller('categoriesController', function($scope) {
      $scope.novaCategoria = {
    nome: ''
  };
  
  // Inicializa o contador
  $scope.contador = 100;
  
  // Atualiza o contador de caracteres
  $scope.atualizarContador = function() {
    $scope.contador = 100 - ($scope.novaCategoria.nome ? $scope.novaCategoria.nome.length : 0);
    document.getElementById('contadorCaracteres').textContent = $scope.contador;
  };
  
  // Função para salvar
  $scope.salvarCategoria = function() {
    if ($scope.novaCategoria.nome && $scope.novaCategoria.nome.length > 0) {
      console.log('Categoria salva:', $scope.novaCategoria.nome);
      // Aqui você adiciona a lógica para salvar
      $('#meuModal').modal('hide'); // Fecha o modal
      $scope.novaCategoria.nome = ''; // Limpa o campo
      $scope.contador = 100; // Reseta o contador
    }
  };


 
$scope.categories = [];

$scope.novaCategoria = {
  nome: '',
  icon: 'bi-folder',
  phrasesCount: 0
};

$scope.salvarCategoria = function() {
  if ($scope.novaCategoria.nome && $scope.novaCategoria.nome.trim() !== '') {
    $scope.categories.push({
      name: $scope.novaCategoria.nome,
      icon: $scope.novaCategoria.icon,
      phrasesCount: $scope.novaCategoria.phrasesCount
    });
    
    // Limpa o formulário
    $scope.novaCategoria.nome = '';
    document.getElementById('contadorCaracteres').textContent = '100';
  }
};

$scope.removeCategory = function(index) {
  if (confirm('Tem certeza que deseja remover esta categoria?')) {
    $scope.categories.splice(index, 1);
  }
};

$scope.atualizarContador = function() {
  const max = 100;
  const restante = max - ($scope.novaCategoria.nome ? $scope.novaCategoria.nome.length : 0);
  document.getElementById('contadorCaracteres').textContent = restante;
};
});