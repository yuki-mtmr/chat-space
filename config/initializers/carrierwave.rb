require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: Rails.application.secrets.aws_access_key_id,
    aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
    region: '自分で調べて入れてください' #例 'ap-northeast-1'
  }

  config.fog_directory  = 'matt1986bucket1'
  config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/matt1986bucket1'
end