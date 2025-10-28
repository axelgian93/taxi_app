//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_trip_id_receipt_get200_response.g.dart';

/// PaymentsTripIdReceiptGet200Response
///
/// Properties:
/// * [tripId] 
/// * [amountUsd] 
/// * [currency] 
/// * [method] 
/// * [status] 
/// * [provider] 
/// * [type] 
/// * [paidAt] 
@BuiltValue()
abstract class PaymentsTripIdReceiptGet200Response implements Built<PaymentsTripIdReceiptGet200Response, PaymentsTripIdReceiptGet200ResponseBuilder> {
  @BuiltValueField(wireName: r'tripId')
  String? get tripId;

  @BuiltValueField(wireName: r'amountUsd')
  num? get amountUsd;

  @BuiltValueField(wireName: r'currency')
  String? get currency;

  @BuiltValueField(wireName: r'method')
  String? get method;

  @BuiltValueField(wireName: r'status')
  String? get status;

  @BuiltValueField(wireName: r'provider')
  String? get provider;

  @BuiltValueField(wireName: r'type')
  PaymentsTripIdReceiptGet200ResponseTypeEnum? get type;
  // enum typeEnum {  TRIP,  CANCELLATION_FEE,  };

  @BuiltValueField(wireName: r'paidAt')
  DateTime? get paidAt;

  PaymentsTripIdReceiptGet200Response._();

  factory PaymentsTripIdReceiptGet200Response([void updates(PaymentsTripIdReceiptGet200ResponseBuilder b)]) = _$PaymentsTripIdReceiptGet200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsTripIdReceiptGet200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsTripIdReceiptGet200Response> get serializer => _$PaymentsTripIdReceiptGet200ResponseSerializer();
}

class _$PaymentsTripIdReceiptGet200ResponseSerializer implements PrimitiveSerializer<PaymentsTripIdReceiptGet200Response> {
  @override
  final Iterable<Type> types = const [PaymentsTripIdReceiptGet200Response, _$PaymentsTripIdReceiptGet200Response];

  @override
  final String wireName = r'PaymentsTripIdReceiptGet200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsTripIdReceiptGet200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.tripId != null) {
      yield r'tripId';
      yield serializers.serialize(
        object.tripId,
        specifiedType: const FullType(String),
      );
    }
    if (object.amountUsd != null) {
      yield r'amountUsd';
      yield serializers.serialize(
        object.amountUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.currency != null) {
      yield r'currency';
      yield serializers.serialize(
        object.currency,
        specifiedType: const FullType(String),
      );
    }
    if (object.method != null) {
      yield r'method';
      yield serializers.serialize(
        object.method,
        specifiedType: const FullType(String),
      );
    }
    if (object.status != null) {
      yield r'status';
      yield serializers.serialize(
        object.status,
        specifiedType: const FullType(String),
      );
    }
    if (object.provider != null) {
      yield r'provider';
      yield serializers.serialize(
        object.provider,
        specifiedType: const FullType(String),
      );
    }
    if (object.type != null) {
      yield r'type';
      yield serializers.serialize(
        object.type,
        specifiedType: const FullType(PaymentsTripIdReceiptGet200ResponseTypeEnum),
      );
    }
    if (object.paidAt != null) {
      yield r'paidAt';
      yield serializers.serialize(
        object.paidAt,
        specifiedType: const FullType(DateTime),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentsTripIdReceiptGet200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsTripIdReceiptGet200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'tripId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tripId = valueDes;
          break;
        case r'amountUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.amountUsd = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        case r'method':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.method = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.status = valueDes;
          break;
        case r'provider':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.provider = valueDes;
          break;
        case r'type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(PaymentsTripIdReceiptGet200ResponseTypeEnum),
          ) as PaymentsTripIdReceiptGet200ResponseTypeEnum;
          result.type = valueDes;
          break;
        case r'paidAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.paidAt = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentsTripIdReceiptGet200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsTripIdReceiptGet200ResponseBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class PaymentsTripIdReceiptGet200ResponseTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'TRIP')
  static const PaymentsTripIdReceiptGet200ResponseTypeEnum TRIP = _$paymentsTripIdReceiptGet200ResponseTypeEnum_TRIP;
  @BuiltValueEnumConst(wireName: r'CANCELLATION_FEE')
  static const PaymentsTripIdReceiptGet200ResponseTypeEnum CANCELLATION_FEE = _$paymentsTripIdReceiptGet200ResponseTypeEnum_CANCELLATION_FEE;

  static Serializer<PaymentsTripIdReceiptGet200ResponseTypeEnum> get serializer => _$paymentsTripIdReceiptGet200ResponseTypeEnumSerializer;

  const PaymentsTripIdReceiptGet200ResponseTypeEnum._(String name): super(name);

  static BuiltSet<PaymentsTripIdReceiptGet200ResponseTypeEnum> get values => _$paymentsTripIdReceiptGet200ResponseTypeEnumValues;
  static PaymentsTripIdReceiptGet200ResponseTypeEnum valueOf(String name) => _$paymentsTripIdReceiptGet200ResponseTypeEnumValueOf(name);
}

