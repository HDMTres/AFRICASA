variable "hub_rg_name" {
  description = "Name of the resource group for the hub"
  type        = string

}

variable "location" {
  description = "Location of the resource group"
  type        = string
  default     = "francecentral"

}

variable "vnet_hub_name" {
  description = "Name of the hub virtual network"
  type        = string

}

variable "address_space_hub" {
  description = "Address space of the hub virtual network"
  type        = string

}