web_vm_size      = "Standard_B1s"
hub_rg_name      = "rg-hub"
location         = "francecentral"
app_vnet_name    = "vnet-app"
monitor_vnet_name = "vnet-monitor"
app_address_space = "10.0.1.0/24"
monitor_address_space = "10.0.2.0/24"
vnet_hub_name    = "vnet-hub"
app_rg_name      = "rg-app"

linux_vms = {
  vm-app = {
    vm_name          = "vm-app"
    nic_name         = "nic-app"
    public_ip_name   = "ip-app"
    admin_username   = "userafricasa"
    public_key_paths = ["~/.ssh/id_rsa.pub", "~/.ssh/id_rsa_loic.pub"]
    subnet= "app"
  }
  vm-monitor = {
    vm_name          = "vm-monitor"
    nic_name         = "nic-monitor"
    public_ip_name   = "ip-monitor"
    admin_username   = "usermonitor"
    public_key_paths = ["~/.ssh/id_rsa.pub", "~/.ssh/id_rsa_loic.pub"]
    subnet= "monitor"
  }
}