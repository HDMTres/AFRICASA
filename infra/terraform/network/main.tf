resource "azurerm_resource_group" "hub_rg" {
  name     = var.hub_rg_name
  location = var.location

}

resource "azurerm_virtual_network" "hub" {
  name                = var.vnet_hub_name
  address_space       = [var.address_space_hub]
  location            = azurerm_resource_group.hub_rg.location
  resource_group_name = azurerm_resource_group.hub_rg.name
}
