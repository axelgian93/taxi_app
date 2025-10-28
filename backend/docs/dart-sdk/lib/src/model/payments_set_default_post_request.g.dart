// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_set_default_post_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsSetDefaultPostRequest extends PaymentsSetDefaultPostRequest {
  @override
  final String paymentMethodId;

  factory _$PaymentsSetDefaultPostRequest(
          [void Function(PaymentsSetDefaultPostRequestBuilder)? updates]) =>
      (PaymentsSetDefaultPostRequestBuilder()..update(updates))._build();

  _$PaymentsSetDefaultPostRequest._({required this.paymentMethodId})
      : super._();
  @override
  PaymentsSetDefaultPostRequest rebuild(
          void Function(PaymentsSetDefaultPostRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsSetDefaultPostRequestBuilder toBuilder() =>
      PaymentsSetDefaultPostRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsSetDefaultPostRequest &&
        paymentMethodId == other.paymentMethodId;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, paymentMethodId.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PaymentsSetDefaultPostRequest')
          ..add('paymentMethodId', paymentMethodId))
        .toString();
  }
}

class PaymentsSetDefaultPostRequestBuilder
    implements
        Builder<PaymentsSetDefaultPostRequest,
            PaymentsSetDefaultPostRequestBuilder> {
  _$PaymentsSetDefaultPostRequest? _$v;

  String? _paymentMethodId;
  String? get paymentMethodId => _$this._paymentMethodId;
  set paymentMethodId(String? paymentMethodId) =>
      _$this._paymentMethodId = paymentMethodId;

  PaymentsSetDefaultPostRequestBuilder() {
    PaymentsSetDefaultPostRequest._defaults(this);
  }

  PaymentsSetDefaultPostRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _paymentMethodId = $v.paymentMethodId;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsSetDefaultPostRequest other) {
    _$v = other as _$PaymentsSetDefaultPostRequest;
  }

  @override
  void update(void Function(PaymentsSetDefaultPostRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsSetDefaultPostRequest build() => _build();

  _$PaymentsSetDefaultPostRequest _build() {
    final _$result = _$v ??
        _$PaymentsSetDefaultPostRequest._(
          paymentMethodId: BuiltValueNullFieldError.checkNotNull(
              paymentMethodId,
              r'PaymentsSetDefaultPostRequest',
              'paymentMethodId'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
