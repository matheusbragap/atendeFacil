angular.module('atendeFacil').service('confirmModalService', ['$rootScope', function ($rootScope) {
    let modalInstance = null // armazena a instância do modal para que possa ser fechado
    let currentBackdrop = null // armazena o backdrop atual para que possa ser removido

    // ===================================================== initialize =====================================================
    this.initialize = () => {
        if (!document.getElementById('confirmModal')) { // se não existir um modal com o id confirmModal
            const modalTemplate = document.createElement('div') // cria um novo div
            modalTemplate.setAttribute('ng-include', "'components/confirmModal.html'") // define o template do modal
            document.body.appendChild(modalTemplate) // joga no body
        }
    }
    // ===================================================== initialize =====================================================

    // ===================================================== createBackdrop =====================================================
    const createBackdrop = () => { // cria o backdrop
        if (currentBackdrop) { // se existir um backdrop anterior
            currentBackdrop.remove() // remove o backdrop anterior
        }
        currentBackdrop = document.createElement('div') // cria um novo div e armazena na variável currentBackdrop
        currentBackdrop.className = 'confirm-backdrop' // define o nome da classe do backdrop
        document.body.appendChild(currentBackdrop) // joga no body
    }
    // ===================================================== createBackdrop =====================================================

    // ===================================================== removeBackdrop =====================================================
    const removeBackdrop = () => { // remove o backdrop
        if (currentBackdrop) { // se existir um backdrop
            currentBackdrop.remove() // remove o backdrop
            currentBackdrop = null // define a variável currentBackdrop como null para que possa ser criado um novo backdrop
        }
    }
    // ===================================================== removeBackdrop =====================================================

    // ===================================================== show =====================================================
    this.show = (options = {}) => { // mostra o modal e passa as opções para o modal
        return new Promise((resolve) => { 
            // Configura os dados do modal
            $rootScope.confirmModal = {
                title: options.title || 'Confirmação',
                message: options.message || 'Você tem certeza?',
                confirmText: options.confirmText || 'Confirmar',
                cancelText: options.cancelText || 'Cancelar',
                onConfirm: () => {
                    this.hide()
                    resolve(true)
                }
            };

            // Cria o backdrop antes de mostrar o modal
            createBackdrop()

            // Inicializa e mostra o modal
            const modalElement = document.getElementById('confirmModal')
            modalInstance = new bootstrap.Modal(modalElement, {
                backdrop: false // Desabilita o backdrop padrão do Bootstrap
            })

            // Listener para quando o modal for fechado
            modalElement.addEventListener('hidden.bs.modal', () => {
                removeBackdrop()
                resolve(false)
            }, { once: true })

            modalInstance.show()
        });
    };

    this.hide = () => {
        if (modalInstance) {
            modalInstance.hide()
            removeBackdrop()
            modalInstance = null
        }
    }
}])