data "azurerm_resource_group" "hub_rg" {
  name = var.hub_rg_name
}

data "azurerm_virtual_network" "hub" {
  name                = var.vnet_hub_name
  resource_group_name = data.azurerm_resource_group.hub_rg.name
}

resource "azurerm_resource_group" "app_rg" {
  name     = var.app_rg_name
  location = var.location
}


resource "azurerm_subnet" "app_subnet" {
  name                 = var.app_vnet_name
  resource_group_name  = data.azurerm_resource_group.hub_rg.name
  address_prefixes     = [var.app_address_space]
  virtual_network_name = data.azurerm_virtual_network.hub.name
}


resource "azurerm_public_ip" "pub_ip" {
  name                = var.web_public_ip_name
  location            = var.location
  resource_group_name = azurerm_resource_group.app_rg.name

  allocation_method = "Static"
}

resource "azurerm_network_interface" "nic_web" {
  name                = var.nic_web_name
  location            = azurerm_resource_group.app_rg.location
  resource_group_name = azurerm_resource_group.app_rg.name

  ip_configuration {
    name                          = "ipconfig1"
    subnet_id                     = azurerm_subnet.app_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.pub_ip.id
  }

}


resource "azurerm_linux_virtual_machine" "web_server" {
  name                = var.web_vm_name
  location            = azurerm_resource_group.app_rg.location
  resource_group_name = azurerm_resource_group.app_rg.name
  size                = var.web_vm_size
  admin_username      = var.web_admin_username
  network_interface_ids = [
    azurerm_network_interface.nic_web.id
  ]

  admin_ssh_key {
    username   = var.web_admin_username
    public_key = file(var.public_key_path)
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "StandardSSD_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
}


#resource "azurerm_subnet_network_security_group_association" "nic_nsg_assoc" {
#  subnet_id = azurerm_subnet.app_subnet.id
#  network_security_group_id = azurerm_network_security_group.web_nsg.id
#
#}