package cz.drivefuture.tatrainvoice.service.dto;

import cz.drivefuture.tatrainvoice.domain.Company;

public class CompanyDTO {
    private Long id;

    private String name;

    public CompanyDTO() {
        // Empty constructor needed for Jackson.
    }

    public CompanyDTO(Company company) {
        this.id = company.getId();
        this.name = company.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CompanyDTO [id=" + id + ", name=" + name + "]";
    }
}
