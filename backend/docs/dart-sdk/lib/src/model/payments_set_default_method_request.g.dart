// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_set_default_method_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsSetDefaultMethodRequest
    extends PaymentsSetDefaultMethodRequest {
  @override
  final String paymentMethodId;

  factory _$PaymentsSetDefaultMethodRequest(
          [void Function(PaymentsSetDefaultMethodRequestBuilder)? updates]) =>
      (PaymentsSetDefaultMethodRequestBuilder()..update(updates))._build();

  _$PaymentsSetDefaultMethodRequest._({required this.paymentMethodId})
      : super._();
  @override
  PaymentsSetDefaultMethodRequest rebuild(
          void Function(PaymentsSetDefaultMethodRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsSetDefaultMethodRequestBuilder toBuilder() =>
      PaymentsSetDefaultMethodRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsSetDefaultMethodRequest &&
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
    return (newBuiltValueToStringHelper(r'PaymentsSetDefaultMethodRequest')
          ..add('paymentMethodId', paymentMethodId))
        .toString();
  }
}

class PaymentsSetDefaultMethodRequestBuilder
    implements
        Builder<PaymentsSetDefaultMethodRequest,
            PaymentsSetDefaultMethodRequestBuilder> {
  _$PaymentsSetDefaultMethodRequest? _$v;

  String? _paymentMethodId;
  String? get paymentMethodId => _$this._paymentMethodId;
  set paymentMethodId(String? paymentMethodId) =>
      _$this._paymentMethodId = paymentMethodId;

  PaymentsSetDefaultMethodRequestBuilder() {
    PaymentsSetDefaultMethodRequest._defaults(this);
  }

  PaymentsSetDefaultMethodRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _paymentMethodId = $v.paymentMethodId;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsSetDefaultMethodRequest other) {
    _$v = other as _$PaymentsSetDefaultMethodRequest;
  }

  @override
  void update(void Function(PaymentsSetDefaultMethodRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsSetDefaultMethodRequest build() => _build();

  _$PaymentsSetDefaultMethodRequest _build() {
    final _$result = _$v ??
        _$PaymentsSetDefaultMethodRequest._(
          paymentMethodId: BuiltValueNullFieldError.checkNotNull(
              paymentMethodId,
              r'PaymentsSetDefaultMethodRequest',
              'paymentMethodId'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
