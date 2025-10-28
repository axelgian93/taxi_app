// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_id_complete_post_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const TripsIdCompletePostRequestMethodEnum
    _$tripsIdCompletePostRequestMethodEnum_CASH =
    const TripsIdCompletePostRequestMethodEnum._('CASH');
const TripsIdCompletePostRequestMethodEnum
    _$tripsIdCompletePostRequestMethodEnum_CARD =
    const TripsIdCompletePostRequestMethodEnum._('CARD');
const TripsIdCompletePostRequestMethodEnum
    _$tripsIdCompletePostRequestMethodEnum_TRANSFER =
    const TripsIdCompletePostRequestMethodEnum._('TRANSFER');

TripsIdCompletePostRequestMethodEnum
    _$tripsIdCompletePostRequestMethodEnumValueOf(String name) {
  switch (name) {
    case 'CASH':
      return _$tripsIdCompletePostRequestMethodEnum_CASH;
    case 'CARD':
      return _$tripsIdCompletePostRequestMethodEnum_CARD;
    case 'TRANSFER':
      return _$tripsIdCompletePostRequestMethodEnum_TRANSFER;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<TripsIdCompletePostRequestMethodEnum>
    _$tripsIdCompletePostRequestMethodEnumValues = BuiltSet<
        TripsIdCompletePostRequestMethodEnum>(const <TripsIdCompletePostRequestMethodEnum>[
  _$tripsIdCompletePostRequestMethodEnum_CASH,
  _$tripsIdCompletePostRequestMethodEnum_CARD,
  _$tripsIdCompletePostRequestMethodEnum_TRANSFER,
]);

Serializer<TripsIdCompletePostRequestMethodEnum>
    _$tripsIdCompletePostRequestMethodEnumSerializer =
    _$TripsIdCompletePostRequestMethodEnumSerializer();

class _$TripsIdCompletePostRequestMethodEnumSerializer
    implements PrimitiveSerializer<TripsIdCompletePostRequestMethodEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'CASH': 'CASH',
    'CARD': 'CARD',
    'TRANSFER': 'TRANSFER',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'CASH': 'CASH',
    'CARD': 'CARD',
    'TRANSFER': 'TRANSFER',
  };

  @override
  final Iterable<Type> types = const <Type>[
    TripsIdCompletePostRequestMethodEnum
  ];
  @override
  final String wireName = 'TripsIdCompletePostRequestMethodEnum';

  @override
  Object serialize(
          Serializers serializers, TripsIdCompletePostRequestMethodEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  TripsIdCompletePostRequestMethodEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      TripsIdCompletePostRequestMethodEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$TripsIdCompletePostRequest extends TripsIdCompletePostRequest {
  @override
  final TripsIdCompletePostRequestMethodEnum? method;
  @override
  final String? paymentMethodId;

  factory _$TripsIdCompletePostRequest(
          [void Function(TripsIdCompletePostRequestBuilder)? updates]) =>
      (TripsIdCompletePostRequestBuilder()..update(updates))._build();

  _$TripsIdCompletePostRequest._({this.method, this.paymentMethodId})
      : super._();
  @override
  TripsIdCompletePostRequest rebuild(
          void Function(TripsIdCompletePostRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsIdCompletePostRequestBuilder toBuilder() =>
      TripsIdCompletePostRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsIdCompletePostRequest &&
        method == other.method &&
        paymentMethodId == other.paymentMethodId;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, method.hashCode);
    _$hash = $jc(_$hash, paymentMethodId.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsIdCompletePostRequest')
          ..add('method', method)
          ..add('paymentMethodId', paymentMethodId))
        .toString();
  }
}

class TripsIdCompletePostRequestBuilder
    implements
        Builder<TripsIdCompletePostRequest, TripsIdCompletePostRequestBuilder> {
  _$TripsIdCompletePostRequest? _$v;

  TripsIdCompletePostRequestMethodEnum? _method;
  TripsIdCompletePostRequestMethodEnum? get method => _$this._method;
  set method(TripsIdCompletePostRequestMethodEnum? method) =>
      _$this._method = method;

  String? _paymentMethodId;
  String? get paymentMethodId => _$this._paymentMethodId;
  set paymentMethodId(String? paymentMethodId) =>
      _$this._paymentMethodId = paymentMethodId;

  TripsIdCompletePostRequestBuilder() {
    TripsIdCompletePostRequest._defaults(this);
  }

  TripsIdCompletePostRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _method = $v.method;
      _paymentMethodId = $v.paymentMethodId;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsIdCompletePostRequest other) {
    _$v = other as _$TripsIdCompletePostRequest;
  }

  @override
  void update(void Function(TripsIdCompletePostRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsIdCompletePostRequest build() => _build();

  _$TripsIdCompletePostRequest _build() {
    final _$result = _$v ??
        _$TripsIdCompletePostRequest._(
          method: method,
          paymentMethodId: paymentMethodId,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
