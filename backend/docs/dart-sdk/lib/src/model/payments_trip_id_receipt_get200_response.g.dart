// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_trip_id_receipt_get200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const PaymentsTripIdReceiptGet200ResponseTypeEnum
    _$paymentsTripIdReceiptGet200ResponseTypeEnum_TRIP =
    const PaymentsTripIdReceiptGet200ResponseTypeEnum._('TRIP');
const PaymentsTripIdReceiptGet200ResponseTypeEnum
    _$paymentsTripIdReceiptGet200ResponseTypeEnum_CANCELLATION_FEE =
    const PaymentsTripIdReceiptGet200ResponseTypeEnum._('CANCELLATION_FEE');

PaymentsTripIdReceiptGet200ResponseTypeEnum
    _$paymentsTripIdReceiptGet200ResponseTypeEnumValueOf(String name) {
  switch (name) {
    case 'TRIP':
      return _$paymentsTripIdReceiptGet200ResponseTypeEnum_TRIP;
    case 'CANCELLATION_FEE':
      return _$paymentsTripIdReceiptGet200ResponseTypeEnum_CANCELLATION_FEE;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<PaymentsTripIdReceiptGet200ResponseTypeEnum>
    _$paymentsTripIdReceiptGet200ResponseTypeEnumValues = BuiltSet<
        PaymentsTripIdReceiptGet200ResponseTypeEnum>(const <PaymentsTripIdReceiptGet200ResponseTypeEnum>[
  _$paymentsTripIdReceiptGet200ResponseTypeEnum_TRIP,
  _$paymentsTripIdReceiptGet200ResponseTypeEnum_CANCELLATION_FEE,
]);

Serializer<PaymentsTripIdReceiptGet200ResponseTypeEnum>
    _$paymentsTripIdReceiptGet200ResponseTypeEnumSerializer =
    _$PaymentsTripIdReceiptGet200ResponseTypeEnumSerializer();

class _$PaymentsTripIdReceiptGet200ResponseTypeEnumSerializer
    implements
        PrimitiveSerializer<PaymentsTripIdReceiptGet200ResponseTypeEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'TRIP': 'TRIP',
    'CANCELLATION_FEE': 'CANCELLATION_FEE',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'TRIP': 'TRIP',
    'CANCELLATION_FEE': 'CANCELLATION_FEE',
  };

  @override
  final Iterable<Type> types = const <Type>[
    PaymentsTripIdReceiptGet200ResponseTypeEnum
  ];
  @override
  final String wireName = 'PaymentsTripIdReceiptGet200ResponseTypeEnum';

  @override
  Object serialize(Serializers serializers,
          PaymentsTripIdReceiptGet200ResponseTypeEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  PaymentsTripIdReceiptGet200ResponseTypeEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      PaymentsTripIdReceiptGet200ResponseTypeEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$PaymentsTripIdReceiptGet200Response
    extends PaymentsTripIdReceiptGet200Response {
  @override
  final String? tripId;
  @override
  final num? amountUsd;
  @override
  final String? currency;
  @override
  final String? method;
  @override
  final String? status;
  @override
  final String? provider;
  @override
  final PaymentsTripIdReceiptGet200ResponseTypeEnum? type;
  @override
  final DateTime? paidAt;

  factory _$PaymentsTripIdReceiptGet200Response(
          [void Function(PaymentsTripIdReceiptGet200ResponseBuilder)?
              updates]) =>
      (PaymentsTripIdReceiptGet200ResponseBuilder()..update(updates))._build();

  _$PaymentsTripIdReceiptGet200Response._(
      {this.tripId,
      this.amountUsd,
      this.currency,
      this.method,
      this.status,
      this.provider,
      this.type,
      this.paidAt})
      : super._();
  @override
  PaymentsTripIdReceiptGet200Response rebuild(
          void Function(PaymentsTripIdReceiptGet200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsTripIdReceiptGet200ResponseBuilder toBuilder() =>
      PaymentsTripIdReceiptGet200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsTripIdReceiptGet200Response &&
        tripId == other.tripId &&
        amountUsd == other.amountUsd &&
        currency == other.currency &&
        method == other.method &&
        status == other.status &&
        provider == other.provider &&
        type == other.type &&
        paidAt == other.paidAt;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, tripId.hashCode);
    _$hash = $jc(_$hash, amountUsd.hashCode);
    _$hash = $jc(_$hash, currency.hashCode);
    _$hash = $jc(_$hash, method.hashCode);
    _$hash = $jc(_$hash, status.hashCode);
    _$hash = $jc(_$hash, provider.hashCode);
    _$hash = $jc(_$hash, type.hashCode);
    _$hash = $jc(_$hash, paidAt.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PaymentsTripIdReceiptGet200Response')
          ..add('tripId', tripId)
          ..add('amountUsd', amountUsd)
          ..add('currency', currency)
          ..add('method', method)
          ..add('status', status)
          ..add('provider', provider)
          ..add('type', type)
          ..add('paidAt', paidAt))
        .toString();
  }
}

class PaymentsTripIdReceiptGet200ResponseBuilder
    implements
        Builder<PaymentsTripIdReceiptGet200Response,
            PaymentsTripIdReceiptGet200ResponseBuilder> {
  _$PaymentsTripIdReceiptGet200Response? _$v;

  String? _tripId;
  String? get tripId => _$this._tripId;
  set tripId(String? tripId) => _$this._tripId = tripId;

  num? _amountUsd;
  num? get amountUsd => _$this._amountUsd;
  set amountUsd(num? amountUsd) => _$this._amountUsd = amountUsd;

  String? _currency;
  String? get currency => _$this._currency;
  set currency(String? currency) => _$this._currency = currency;

  String? _method;
  String? get method => _$this._method;
  set method(String? method) => _$this._method = method;

  String? _status;
  String? get status => _$this._status;
  set status(String? status) => _$this._status = status;

  String? _provider;
  String? get provider => _$this._provider;
  set provider(String? provider) => _$this._provider = provider;

  PaymentsTripIdReceiptGet200ResponseTypeEnum? _type;
  PaymentsTripIdReceiptGet200ResponseTypeEnum? get type => _$this._type;
  set type(PaymentsTripIdReceiptGet200ResponseTypeEnum? type) =>
      _$this._type = type;

  DateTime? _paidAt;
  DateTime? get paidAt => _$this._paidAt;
  set paidAt(DateTime? paidAt) => _$this._paidAt = paidAt;

  PaymentsTripIdReceiptGet200ResponseBuilder() {
    PaymentsTripIdReceiptGet200Response._defaults(this);
  }

  PaymentsTripIdReceiptGet200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _tripId = $v.tripId;
      _amountUsd = $v.amountUsd;
      _currency = $v.currency;
      _method = $v.method;
      _status = $v.status;
      _provider = $v.provider;
      _type = $v.type;
      _paidAt = $v.paidAt;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsTripIdReceiptGet200Response other) {
    _$v = other as _$PaymentsTripIdReceiptGet200Response;
  }

  @override
  void update(
      void Function(PaymentsTripIdReceiptGet200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsTripIdReceiptGet200Response build() => _build();

  _$PaymentsTripIdReceiptGet200Response _build() {
    final _$result = _$v ??
        _$PaymentsTripIdReceiptGet200Response._(
          tripId: tripId,
          amountUsd: amountUsd,
          currency: currency,
          method: method,
          status: status,
          provider: provider,
          type: type,
          paidAt: paidAt,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
