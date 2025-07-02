terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=4.27.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "c4b5d154-2aa2-44cb-8650-0c5311629067"
}

data "azurerm_client_config" "current" {}
