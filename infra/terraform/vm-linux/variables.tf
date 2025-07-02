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

variable "app_address_space" {
  description = "Espace d'adresses du réseau virtuel pour le sous réseau du registre de conteneurs"
  type        = string

}

variable "web_public_ip_name" {
  description = "Nom de l'adresse IP publique pour le registre de conteneurs"
  type        = string

}

variable "nic_web_name" {
  description = "Nom de l'interface réseau pour le registre de conteneurs"
  type        = string

}

variable "web_vm_name" {
  description = "Nom de la machine virtuelle pour le registre de conteneurs"
  type        = string

}

variable "web_vm_size" {
  description = "Taille de la machine virtuelle pour le registre de conteneurs"
  type        = string
  default     = "Standard_DS2_v2"

}

variable "web_admin_username" {
  description = "valuer de l'utilisateur administrateur pour la machine virtuelle du serveur registre de conteneurs"
  type        = string
}

variable "public_key_path" {
  description = "Chemin de la clé publique pour l'authentification SSH"
  type        = string
  default     = "~/.ssh/id_rsa.pub"

}

variable "vnet_hub_name" {
  description = "Nom du réseau virtuel pour le hub"
  type        = string

}

variable "app_rg_name" {
  description = "Nom du groupe de ressources pour le registre de conteneurs"
  type        = string

}
