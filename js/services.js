document.addEventListener('DOMContentLoaded', function() {
    // Load services data
    fetch('js/services.json')
        .then(response => response.json())
        .then(services => {
            // Handle modal opening
            $('#serviceModal').on('show.bs.modal', function (event) {
                const button = $(event.relatedTarget);
                const serviceId = button.data('service') || button.closest('.service-item').data('service');
                const serviceData = services[serviceId];
                const modal = $(this);

                if (serviceData) {
                    modal.find('.modal-title').text(serviceData.title);
                    
                    // Build the content HTML
                    let content = `
                        <div class="service-details">
                            <p class="lead">${serviceData.description}</p>
                            
                            <h4>Nos prestations comprennent :</h4>
                            <ul class="service-features">
                                ${serviceData.features.map(feature => `<li><i class="fa fa-check text-primary mr-2"></i>${feature}</li>`).join('')}
                            </ul>
                            
                            <h4 class="mt-4">Nos avantages :</h4>
                            <ul class="service-benefits">
                                ${serviceData.benefits.map(benefit => `<li><i class="fa fa-star text-primary mr-2"></i>${benefit}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                    
                    modal.find('#serviceDetails').html(content);
                }
            });
        })
        .catch(error => console.error('Error loading services:', error));

    // Add hover effect to service cards
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
