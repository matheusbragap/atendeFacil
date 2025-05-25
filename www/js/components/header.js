angular.module('atendeFacil.components')
    .component('header', {
        templateUrl: 'components/header.html',
        controller: ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
            var ctrl = this;

            ctrl.$onInit = function () {
                initSidebar();
            };

            function initSidebar() {
                var sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    new bootstrap.Offcanvas(sidebar);
                }
            }

            ctrl.exportData = function () {
                try {
                    var dados = {};
                    for (var i = 0; i < localStorage.length; i++) {
                        var chave = localStorage.key(i);
                        dados[chave] = localStorage.getItem(chave);
                    }

                    var jsonString = JSON.stringify(dados, null, 2);
                    var blob = new Blob([jsonString], { type: 'application/json' });
                    var url = URL.createObjectURL(blob);

                    var link = document.createElement('a');
                    link.href = url;
                    link.download = 'atende_facil_backup_' + new Date().toISOString().split('T')[0] + '.json';
                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                } catch (erro) {
                    console.error('Erro ao exportar dados:', erro);
                }
            };

            ctrl.importData = function () {
                try {
                    var input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.json';

                    input.onchange = function (event) {
                        var arquivo = event.target.files[0];
                        var leitor = new FileReader();

                        leitor.onload = function (e) {
                            try {
                                var dados = JSON.parse(e.target.result);
                                localStorage.clear();

                                Object.keys(dados).forEach(function (chave) {
                                    localStorage.setItem(chave, dados[chave]);
                                });
                                window.location.reload();
                            } catch (erro) {
                                console.error('Erro ao importar dados:', erro);
                            }
                        };

                        leitor.readAsText(arquivo);
                    };

                    input.click();
                } catch (erro) {
                    console.error('Erro ao importar dados:', erro);
                }
            }

        }]


    });