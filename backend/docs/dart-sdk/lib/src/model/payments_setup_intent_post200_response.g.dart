// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_setup_intent_post200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsSetupIntentPost200Response
    extends PaymentsSetupIntentPost200Response {
  @override
  final String? clientSecret;

  factory _$PaymentsSetupIntentPost200Response(
          [void Function(PaymentsSetupIntentPost200ResponseBuilder)?
              updates]) =>
      (PaymentsSetupIntentPost200ResponseBuilder()..update(updates))._build();

  _$PaymentsSetupIntentPost200Response._({this.clientSecret}) : super._();
  @override
  PaymentsSetupIntentPost200Response rebuild(
          void Function(PaymentsSetupIntentPost200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsSetupIntentPost200ResponseBuilder toBuilder() =>
      PaymentsSetupIntentPost200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsSetupIntentPost200Response &&
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
    return (newBuiltValueToStringHelper(r'PaymentsSetupIntentPost200Response')
          ..add('clientSecret', clientSecret))
        .toString();
  }
}

class PaymentsSetupIntentPost200ResponseBuilder
    implements
        Builder<PaymentsSetupIntentPost200Response,
            PaymentsSetupIntentPost200ResponseBuilder> {
  _$PaymentsSetupIntentPost200Response? _$v;

  String? _clientSecret;
  String? get clientSecret => _$this._clientSecret;
  set clientSecret(String? clientSecret) => _$this._clientSecret = clientSecret;

  PaymentsSetupIntentPost200ResponseBuilder() {
    PaymentsSetupIntentPost200Response._defaults(this);
  }

  PaymentsSetupIntentPost200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _clientSecret = $v.clientSecret;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsSetupIntentPost200Response other) {
    _$v = other as _$PaymentsSetupIntentPost200Response;
  }

  @override
  void update(
      void Function(PaymentsSetupIntentPost200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsSetupIntentPost200Response build() => _build();

  _$PaymentsSetupIntentPost200Response _build() {
    final _$result = _$v ??
        _$PaymentsSetupIntentPost200Response._(
          clientSecret: clientSecret,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
