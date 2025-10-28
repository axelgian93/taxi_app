// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_create_setup_intent200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsCreateSetupIntent200Response
    extends PaymentsCreateSetupIntent200Response {
  @override
  final String? clientSecret;

  factory _$PaymentsCreateSetupIntent200Response(
          [void Function(PaymentsCreateSetupIntent200ResponseBuilder)?
              updates]) =>
      (PaymentsCreateSetupIntent200ResponseBuilder()..update(updates))._build();

  _$PaymentsCreateSetupIntent200Response._({this.clientSecret}) : super._();
  @override
  PaymentsCreateSetupIntent200Response rebuild(
          void Function(PaymentsCreateSetupIntent200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsCreateSetupIntent200ResponseBuilder toBuilder() =>
      PaymentsCreateSetupIntent200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsCreateSetupIntent200Response &&
        clientSecret == other.clientSecret;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, clientSecret.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PaymentsCreateSetupIntent200Response')
          ..add('clientSecret', clientSecret))
        .toString();
  }
}

class PaymentsCreateSetupIntent200ResponseBuilder
    implements
        Builder<PaymentsCreateSetupIntent200Response,
            PaymentsCreateSetupIntent200ResponseBuilder> {
  _$PaymentsCreateSetupIntent200Response? _$v;

  String? _clientSecret;
  String? get clientSecret => _$this._clientSecret;
  set clientSecret(String? clientSecret) => _$this._clientSecret = clientSecret;

  PaymentsCreateSetupIntent200ResponseBuilder() {
    PaymentsCreateSetupIntent200Response._defaults(this);
  }

  PaymentsCreateSetupIntent200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _clientSecret = $v.clientSecret;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsCreateSetupIntent200Response other) {
    _$v = other as _$PaymentsCreateSetupIntent200Response;
  }

  @override
  void update(
      void Function(PaymentsCreateSetupIntent200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsCreateSetupIntent200Response build() => _build();

  _$PaymentsCreateSetupIntent200Response _build() {
    final _$result = _$v ??
        _$PaymentsCreateSetupIntent200Response._(
          clientSecret: clientSecret,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
