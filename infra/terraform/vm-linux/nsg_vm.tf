resource "azurerm_network_security_group" "nsg_app" {
  name                = "nsg-app"
  location            = azurerm_resource_group.app_rg.location
  resource_group_name = azurerm_resource_group.app_rg.name
  security_rule {
    name                       = "allow-http"
    priority                   = 1000
    direction                  = "Inbound"
    access                    = "Allow"
    protocol                  = "Tcp"
    source_port_range         = "*"
    destination_port_range    = "80"
    source_address_prefix     = "*"
    destination_address_prefix = "*"
  }
    security_rule {
        name                       = "allow-https"
        priority                   = 1001
        direction                  = "Inbound"
        access                    = "Allow"
        protocol                  = "Tcp"
        source_port_range         = "*"
        destination_port_range    = "443"
        source_address_prefix     = "*"
        destination_address_prefix = "*"
    }

    security_rule {
        name                       = "allow-ssh"
        priority                   = 1002
        direction                  = "Inbound"
        access                    = "Allow"
        protocol                  = "Tcp"
        source_port_range         = "*"
        destination_port_range    = "22"
        source_address_prefix     = "*"
        destination_address_prefix = "*"
    }
    security_rule {
    name                       = "allow-http-web"
    priority                   = 1003
    direction                  = "Inbound"
    access                    = "Allow"
    protocol                  = "Tcp"
    source_port_range         = "*"
    destination_port_range    = "9090"
    source_address_prefix     = "*"
    destination_address_prefix = "*"
  }
}
resource "azurerm_network_security_group" "nsg_monitor" {
  name                = "nsg-monitor"
  location            = azurerm_resource_group.app_rg.location
  resource_group_name = azurerm_resource_group.app_rg.name

  security_rule {
    name                       = "allow-http"
    priority                   = 1000
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
  security_rule {
    name                       = "allow-http-prometheus"
    priority                   = 1003
    direction                  = "Inbound"
    access                    = "Allow"
    protocol                  = "Tcp"
    source_port_range         = "*"
    destination_port_range    = "9090"
    source_address_prefix     = "*"
    destination_address_prefix = "*"
  }
  security_rule {
        name                       = "allow-ssh"
        priority                   = 1002
        direction                  = "Inbound"
        access                    = "Allow"
        protocol                  = "Tcp"
        source_port_range         = "*"
        destination_port_range    = "22"
        source_address_prefix     = "*"
        destination_address_prefix = "*"
    }
}