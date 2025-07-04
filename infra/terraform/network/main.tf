
data "azurerm_resource_group" "hub_rg" {
  name = var.hub_rg_name
}

data "azurerm_virtual_network" "hub" {
  name                = var.vnet_hub_name
  resource_group_name = data.azurerm_resource_group.hub_rg.name
}


# This part need to be uncommented if you want to create a resource group and a virtual network
# resource "azurerm_resource_group" "hub_rg" {
#   name     = var.hub_rg_name
#   location = var.location

# }

# resource "azurerm_virtual_network" "hub" {
#   name                = var.vnet_hub_name
#   address_space       = [var.address_space_hub]
#   location            = azurerm_resource_group.hub_rg.location
#   resource_group_name = azurerm_resource_group.hub_rg.name
# }





resource "azurerm_container_registry" "acr" {
  name                = var.acr_name      
  # This need to be uncommented             
  # resource_group_name = azurerm_resource_group.hub_rg.name
  # location            = azurerm_resource_group.hub_rg.location
  resource_group_name = data.azurerm_resource_group.hub_rg.name
  location            = data.azurerm_resource_group.hub_rg.location
  sku                 = "Basic"                           # Possible : Basic, Standard, Premium
  admin_enabled       = true                              # Permet login avec username/password

  tags = {
    environment = "staging"
  }
}