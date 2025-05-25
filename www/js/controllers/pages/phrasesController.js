angular.module('atendeFacil').controller('phrasesController', ['$scope', '$routeParams', '$location', 'localDatabase', '$timeout', 'confirmModalService',
    function ($scope, $routeParams, $location, localDatabase, $timeout, confirmModalService) {
        // Inicialização
        const init = () => {
            $scope.categoryId = parseInt($routeParams.categoryId);
            $scope.data = localDatabase.getData();
            $scope.categories = $scope.data.categories;
            $scope.currentCategory = $scope.categories.find(object => object.id === $scope.categoryId);
            updatePhrasesList();
            confirmModalService.initialize();
        };

        // Atualiza a lista de frases
        const updatePhrasesList = () => {
            $scope.phrases = [...(localDatabase.getData().phrases[$scope.categoryId] || [])];
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

        // Função específica para fechar o modal de edição
        $scope.closeEditModal = () => {
            closeModal('editPhraseModal');
            // Limpa os campos do formulário
            $scope.editPhraseText = "";
            $scope.editingIndex = undefined;
        };

        // ######################## PHRASES MANAGEMENT ##############################
        $scope.savePhrase = (phraseText) => {
            if (!phraseText?.trim()) return;

            localDatabase.addPhrases($scope.categoryId, phraseText);
            updatePhrasesList();
            closeModal('modalPhrases');
            $scope.resetModal();
        };

        $scope.deletePhrase = async (phrase, index) => {
            const confirmed = await confirmModalService.show({
                title: 'Excluir Frase',
                message: 'Você tem certeza que deseja apagar esta frase?',
                confirmText: 'Excluir',
                cancelText: 'Cancelar'
            });

            if (confirmed) {
                localDatabase.deletePhrases($scope.categoryId, index);
                updatePhrasesList();
                $scope.$apply();
            }
        };

        // ######################## EDIT PHRASES ##############################
        $scope.startEditing = (phrase, index) => {
            $scope.editPhraseText = phrase;
            $scope.editingIndex = index;
            $timeout(() => {
                const modal = new bootstrap.Modal(document.getElementById('editPhraseModal'));
                modal.show();
            });
        };

        $scope.confirmEditPhrase = () => {
            if ($scope.editingIndex === undefined) {
                return;
            }

            if (!$scope.editPhraseText?.trim()) {
                return;
            }

            const success = localDatabase.editPhrase(
                $scope.categoryId,
                $scope.editingIndex,
                $scope.editPhraseText
            );

            if (success) {
                updatePhrasesList();
                closeModal('editPhraseModal');
                $scope.editPhraseText = "";
                $scope.editingIndex = undefined;
            }
        };

        // ######################## COPY FUNCTIONALITY ##############################
        let currentTooltip = null;
        let currentTimeout = null;

        $scope.copyPhrase = (phrase, $event) => {
            navigator.clipboard.writeText(phrase);

            if (currentTooltip) {
                currentTooltip.remove();
                $timeout.cancel(currentTimeout);
            }

            const isKeyboardEvent = !$event.clientX && !$event.clientY;
            currentTooltip = angular.element('<div class="copied-tooltip">Copiado!</div>');
            currentTooltip.addClass(isKeyboardEvent ? 'keyboard-position' : 'mouse-position');

            const tooltipPosition = isKeyboardEvent
                ? { bottom: '30px', left: '50%', transform: 'translateX(-50%)' }
                : { left: $event.clientX + 'px', top: $event.clientY + 'px' };

            currentTooltip.css(tooltipPosition);
            angular.element(document.body).append(currentTooltip);

            currentTimeout = $timeout(() => {
                if (currentTooltip) {
                    currentTooltip.remove();
                    currentTooltip = null;
                }
            }, 2000);
        };

        // ######################## MODAL MANAGEMENT ##############################
        $scope.clearText = async () => {
            const confirmed = await confirmModalService.show({
                title: 'Limpar Texto',
                message: 'Tem certeza que deseja limpar o texto?',
                confirmText: 'Limpar',
                cancelText: 'Cancelar'
            });

            if (confirmed) {
                // Limpa tanto o texto do modal de nova frase quanto o de edição
                $scope.newPhraseText = "";
                $scope.editPhraseText = "";
                $scope.$apply();
            }
        };

        $scope.resetModal = () => {
            $scope.newPhraseText = "";
        };

        // ######################## NAVIGATION ##############################
        $scope.goBack = () => {
            $location.path('/');
        };

        $scope.getRowBasedNumber = function (index) {
            // Calcula a linha (começando do 0)
            const row = Math.floor(index / 2);
            // Calcula a posição na linha (0 ou 1)
            const colPosition = index % 2;
            // Calcula o número final (linha * 2 + posição + 1)
            return (row * 2) + colPosition + 1;
        };

        // Inicializa o controlador
        init();
    }])