// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_refund_by_trip_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsRefundByTripRequest extends PaymentsRefundByTripRequest {
  @override
  final num? amountUsd;
  @override
  final String? reason;

  factory _$PaymentsRefundByTripRequest(
          [void Function(PaymentsRefundByTripRequestBuilder)? updates]) =>
      (PaymentsRefundByTripRequestBuilder()..update(updates))._build();

  _$PaymentsRefundByTripRequest._({this.amountUsd, this.reason}) : super._();
  @override
  PaymentsRefundByTripRequest rebuild(
          void Function(PaymentsRefundByTripRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsRefundByTripRequestBuilder toBuilder() =>
      PaymentsRefundByTripRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsRefundByTripRequest &&
        amountUsd == other.amountUsd &&
        reason == other.reason;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, amountUsd.hashCode);
    _$hash = $jc(_$hash, reason.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PaymentsRefundByTripRequest')
          ..add('amountUsd', amountUsd)
          ..add('reason', reason))
        .toString();
  }
}

class PaymentsRefundByTripRequestBuilder
    implements
        Builder<PaymentsRefundByTripRequest,
            PaymentsRefundByTripRequestBuilder> {
  _$PaymentsRefundByTripRequest? _$v;

  num? _amountUsd;
  num? get amountUsd => _$this._amountUsd;
  set amountUsd(num? amountUsd) => _$this._amountUsd = amountUsd;

  String? _reason;
  String? get reason => _$this._reason;
  set reason(String? reason) => _$this._reason = reason;

  PaymentsRefundByTripRequestBuilder() {
    PaymentsRefundByTripRequest._defaults(this);
  }

  PaymentsRefundByTripRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _amountUsd = $v.amountUsd;
      _reason = $v.reason;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsRefundByTripRequest other) {
    _$v = other as _$PaymentsRefundByTripRequest;
  }

  @override
  void update(void Function(PaymentsRefundByTripRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsRefundByTripRequest build() => _build();

  _$PaymentsRefundByTripRequest _build() {
    final _$result = _$v ??
        _$PaymentsRefundByTripRequest._(
          amountUsd: amountUsd,
          reason: reason,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
