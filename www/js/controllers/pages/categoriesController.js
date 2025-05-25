angular.module('atendeFacil').controller('categoriesController', ['$scope', 'localDatabase', '$location', 'confirmModalService', '$rootScope',
    function ($scope, localDatabase, $location, confirmModalService, $rootScope) {
        // Inicialização
        const init = () => {
            localDatabase.initialData(); // cria caso n exista o banco de dados
            updateData();
            confirmModalService.initialize();
        };

        // Atualiza dados do controller
        const updateData = () => {
            $scope.data = localDatabase.getData();
            $scope.categories = $scope.data.categories;
            $scope.phrases = $scope.data.phrases;
        };

        // Gerenciamento de Modal
        const closeModal = (modalId) => {
            const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
            if (modal) {
                modal.hide();
                // Remove o backdrop manualmente
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
                // Remove a classe modal-open do body
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }
        };

        //######################## NAVIGATION ############################################
        $scope.goToPhrases = (categoryId) => {
            $rootScope.goToPath('/phrases/' + categoryId);
        }

        //######################## CARDS CATEGORY ############################################
        $scope.removeCategory = async (categoryId, $event) => {
            $event.stopPropagation(); // impede de clicar no card 

            const confirmed = await confirmModalService.show({
                title: 'Remover Categoria',
                message: 'Tem certeza que deseja remover esta categoria e todas suas frases?',
                confirmText: 'Remover',
                cancelText: 'Cancelar'
            });

            if (confirmed) {
                localDatabase.deleteCategories(categoryId);
                updateData();
                $scope.$apply();
            }
        };

        //######################## MODAL MANAGEMENT ############################################
        $scope.saveCategory = (newCategoryName) => {
            if (!newCategoryName?.trim()) return;

            localDatabase.addCategories(newCategoryName); // add no database
            updateData();
            closeModal('modalCategories');
            $scope.resetModal();
        };

        $scope.resetModal = () => {
            $scope.newCategoryName = "";
        };

        // Inicializa o controlador
        init();
    }]);