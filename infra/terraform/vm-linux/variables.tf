variable "hub_rg_name" {
  description = "Nom du groupe de ressources du hub"
  type        = string

}

variable "location" {
  description = "Emplacement du groupe de ressources"
  type        = string
  default     = "francecentral"

}

variable "app_vnet_name" {
  description = "Nom du réseau virtuel pour le registre de conteneurs"
  type        = string

}
variable "monitor_vnet_name" {
  description = "valueur du nom du réseau virtuel pour le serveur de surveillance"
  type        = string
  default     = "vnet-monitor"
}
variable "app_address_space" {
  description = "Espace d'adresses du réseau virtuel pour le sous réseau du registre de conteneurs"
  type        = string

}
variable "monitor_address_space" {
  description = "valueur de l'espace d'adresses du réseau virtuel pour le sous réseau du serveur de surveillance"
  type        = string
}

variable "web_vm_size" {
  description = "Taille de la machine virtuelle pour le registre de conteneurs"
  type        = string
  default     = "Standard_DS2_v2"

}

variable "public_key_path" {
  description = "Chemin de la clé publique pour l'authentification SSH"
  type        = string
  default     = "~/.ssh/id_rsa.pub"

}

variable "loic_public_key_path" {
  description = "valueur de la clé publique pour l'authentification SSH de Loic"
  type        = string
  default     = "~/.ssh/id_rsa_loic.pub"
}

variable "vnet_hub_name" {
  description = "Nom du réseau virtuel pour le hub"
  type        = string

}

variable "app_rg_name" {
  description = "Nom du groupe de ressources pour le registre de conteneurs"
  type        = string

}

variable "linux_vms" {
  description = "Configuration des machines Linux"
  type = map(object({
    vm_name          = string
    nic_name         = string
    public_ip_name   = string
    admin_username   = string
    public_key_paths  = list(string)
    subnet = string
  }))
}