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

resource "azurerm_subnet" "monitor_subnet" {
  name                = var.monitor_vnet_name
  resource_group_name  = data.azurerm_resource_group.hub_rg.name
  address_prefixes = [var.monitor_address_space]
  virtual_network_name = data.azurerm_virtual_network.hub.name
}

resource "azurerm_public_ip" "pub_ip" {
  for_each            = var.linux_vms
  name                = each.value.public_ip_name
  location            = var.location
  resource_group_name = azurerm_resource_group.app_rg.name
  allocation_method   = "Static"
}

resource "azurerm_network_interface" "nic" {
  for_each            = var.linux_vms
  name                = each.value.nic_name
  location            = azurerm_resource_group.app_rg.location
  resource_group_name = azurerm_resource_group.app_rg.name

  ip_configuration {
    name                          = "ipconfig1"
    subnet_id = lookup({
      app     = azurerm_subnet.app_subnet.id,
      monitor = azurerm_subnet.monitor_subnet.id
    }, each.value.subnet, azurerm_subnet.app_subnet.id)
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.pub_ip[each.key].id
  }
}

resource "azurerm_linux_virtual_machine" "linux_vm" {
  for_each            = var.linux_vms
  name                = each.value.vm_name
  location            = azurerm_resource_group.app_rg.location
  resource_group_name = azurerm_resource_group.app_rg.name
  size                = var.web_vm_size
  admin_username      = each.value.admin_username
  network_interface_ids = [
    azurerm_network_interface.nic[each.key].id
  ]

  dynamic "admin_ssh_key" {
    for_each = each.value.public_key_paths
    content {
      username   = each.value.admin_username
      public_key = file(admin_ssh_key.value)
    }
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "StandardSSD_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts-gen2"
    version   = "latest"
  }
}

resource "azurerm_subnet_network_security_group_association" "app_nsg_assoc" {
  subnet_id                 = azurerm_subnet.app_subnet.id
  network_security_group_id = azurerm_network_security_group.nsg_app.id
}

resource "azurerm_subnet_network_security_group_association" "monitor_nsg_assoc" {
  subnet_id                 = azurerm_subnet.monitor_subnet.id
  network_security_group_id = azurerm_network_security_group.nsg_monitor.id
}