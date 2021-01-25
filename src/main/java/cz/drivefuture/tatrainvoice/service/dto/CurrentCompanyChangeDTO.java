package cz.drivefuture.tatrainvoice.service.dto;

public class CurrentCompanyChangeDTO {
    private Long id;

    public CurrentCompanyChangeDTO() {
        // Empty constructor needed for Jackson.
    }

    public CurrentCompanyChangeDTO(Long newCompanyId) {
        this.id = newCompanyId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
